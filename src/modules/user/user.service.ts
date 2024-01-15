import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRegisterInputDto } from './dto/user-register-input.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UserRegisterOutputDto } from './dto/user-register-output.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}
    async register(user: UserRegisterInputDto) {
        try {
            const existedUser = await this.userRepository.getUserByEmail(user.email);
            if (existedUser) throw new ConflictException('User already exist');

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const registeredUser = await this.userRepository.register(uuidv4(), user.email, hashedPassword);

            return plainToClass(UserRegisterOutputDto, { email: registeredUser.email });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
