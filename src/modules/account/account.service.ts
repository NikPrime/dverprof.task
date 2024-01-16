import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './account.repository';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../db/prisma/prisma.service';
import { DebitAccountDto } from './dto/debit-account.dto';

@Injectable()
export class AccountService {
    constructor(
        private accountRepository: AccountRepository,
        private prisma: PrismaService,
    ) {}
    async createAccount(newAccount: CreateAccountDto) {
        try {
            const existedAccount = await this.accountRepository.getAccountByUserCurrency(newAccount.userId, newAccount.currency);
            if (existedAccount) throw new ConflictException(`User account with ${newAccount.currency} already existed`);

            const account = await this.accountRepository.create(uuidv4(), newAccount);

            return plainToClass(CreateAccountDto, account);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async debitAccount(debitAccount: DebitAccountDto) {
        const { userId, amount, currency } = debitAccount;

        return this.prisma.$transaction(async () => {
            const account = await this.accountRepository.getAccountByUserCurrency(userId, currency);
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            if (account.balance < amount) {
                throw new UnprocessableEntityException('Insufficient funds');
            }

            const updatedAccount = await this.accountRepository.update(account.id, amount, false);

            return plainToClass(DebitAccountDto, {
                userId: updatedAccount.userId,
                balance: updatedAccount.balance,
                currency: updatedAccount.currency,
            });
        });
    }
}
