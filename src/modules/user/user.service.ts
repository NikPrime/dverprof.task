import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRegisterInputDto } from './dto/user-register-input.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UserRegisterOutputDto } from './dto/user-register-output.dto';
import { PrismaService } from '../../db/prisma/prisma.service';
import { AccountService } from '../account/account.service';
import { Currency } from '../account/dto/create-account.dto';
import { GetAccountOutputDto } from '../account/dto/get-account-output.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private prisma: PrismaService,
        private accountService: AccountService) {}
    async register(user: UserRegisterInputDto) {
        try {
            const existedUser = await this.userRepository.getUserByEmail(user.email);
            if (existedUser) throw new ConflictException('User already exist');

            const hashedPassword = await bcrypt.hash(user.password, 10);

            return this.prisma.$transaction(async () => {
                const registeredUser = await this.userRepository.register(uuidv4(), user.email, hashedPassword);

                await this.accountService.createAccount({ userId: registeredUser.id, balance: 0, currency: Currency.RUB });

                return plainToClass(UserRegisterOutputDto, { email: registeredUser.email });
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUserById(id: string) {
        try {
            const existedUser = await this.userRepository.getById(id);
            if (!existedUser) throw new NotFoundException('User does not exists');

            return plainToClass(UserDto, {
                email: existedUser.email,
                account: existedUser.accounts.map((account) => ({
                    balance: account.balance,
                    currency: account.currency,
                })),
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
