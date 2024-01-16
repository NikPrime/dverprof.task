import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCardInputDto } from './dto/create-card-input.dto';
import { BankCardRepository } from './bank-card.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateCardOutputDto } from './dto/create-card-output.dto';

@Injectable()
export class BankCardService {
    constructor(private bankCardRepository: BankCardRepository) {}

    async createCard(newCard: CreateCardInputDto) {
        try {
            const existedCard = await this.bankCardRepository.getCardByNumber(newCard.cardNumber);
            if (existedCard) throw new ConflictException(`Card with unique number ${newCard.cardNumber} already existed`);

            const card = await this.bankCardRepository.create(uuidv4(), newCard);

            return plainToClass(CreateCardOutputDto, { accountId: newCard.accountId, cardNumber: card.cardNumber });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
