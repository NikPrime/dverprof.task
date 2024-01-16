import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './account.repository';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../db/prisma/prisma.service';
import { ChangeAccountBalanceInputDto } from './dto/change-account-balance-input.dto';
import { GetAccountOutputDto } from './dto/get-account-output.dto';
import { ChangeAccountBalanceOutputDto } from './dto/change-account-balance-output.dto';

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

    async changeAccountBalance(changeAccountBalanceInput: ChangeAccountBalanceInputDto, increase: boolean) {
        const { userId, amount, currency } = changeAccountBalanceInput;

        return this.prisma.$transaction(async () => {
            const account = await this.accountRepository.getAccountByUserCurrency(userId, currency);
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            if (!increase && account.balance < amount) {
                throw new UnprocessableEntityException('Insufficient funds');
            }

            const updatedAccount = await this.accountRepository.update(account.id, amount, increase);

            return plainToClass(ChangeAccountBalanceOutputDto, {
                userId: updatedAccount.userId,
                balance: updatedAccount.balance,
                currency: updatedAccount.currency,
            });
        });
    }

    async getAccountById(id: string) {
        try {
            const existedAccount = await this.accountRepository.getById(id);
            if (!existedAccount) throw new NotFoundException('Account does not exists');

            return plainToClass(GetAccountOutputDto, {
                id: existedAccount.id,
                userId: existedAccount.userId,
                balance: existedAccount.balance,
                currency: existedAccount.currency,
                company: existedAccount.company
                    ? {
                          name: existedAccount.company.name,
                          checkingAccount: existedAccount.company.checkingAccount,
                      }
                    : null,
                cards: existedAccount.bankCards
                    ? existedAccount.bankCards.map((card) => ({
                          cardNumber: card.bankCard,
                      }))
                    : [],
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
