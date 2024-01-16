import { Body, Controller, Post } from '@nestjs/common';
import { BankCardService } from './bank-card.service';
import { CreateCardInputDto } from './dto/create-card-input.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Card')
@Controller('card')
export class BankCardController {
    constructor(private readonly bankCardService: BankCardService) {}

    @Post()
    async debitAccount(@Body() createCard: CreateCardInputDto) {
        return this.bankCardService.createCard(createCard);
    }
}
