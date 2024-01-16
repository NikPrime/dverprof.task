import { PrismaService } from '../../db/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto, Currency } from './dto/create-account.dto';

@Injectable()
export class AccountRepository {
    constructor(private prisma: PrismaService) {}
    getAccountByUserCurrency(userId: string, currency: Currency) {
        return this.prisma.account.findFirst({
            where: {
                userId,
                currency,
            },
        });
    }

    create(id: string, account: CreateAccountDto) {
        return this.prisma.account.create({
            data: {
                id,
                userId: account.userId,
                balance: account.balance,
                currency: account.currency,
            },
        });
    }
}
