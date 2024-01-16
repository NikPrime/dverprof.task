import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './account.repository';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AccountService {
    constructor(private accountRepository: AccountRepository) {}
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
}
