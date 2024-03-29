import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { CompanyModule } from '../company/company.module';
import { BankCardModule } from '../bank-card/bank-card.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
    imports: [UserModule, AccountModule, CompanyModule, BankCardModule, InvoiceModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
