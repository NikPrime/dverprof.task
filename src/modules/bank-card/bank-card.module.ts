import { Module } from '@nestjs/common';
import { BankCardService } from './bank-card.service';
import { BankCardController } from './bank-card.controller';
import { BankCardRepository } from './bank-card.repository';

@Module({
    providers: [BankCardService, BankCardRepository],
    controllers: [BankCardController],
})
export class BankCardModule {}
