import { Body, Controller, Post } from '@nestjs/common';
import { BankCardService } from './bank-card.service';
import { CreateCardInputDto } from './dto/create-card-input.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardOutputDto } from './dto/create-card-output.dto';

@ApiTags('Card')
@Controller('card')
export class BankCardController {
    constructor(private readonly bankCardService: BankCardService) {}

    @ApiOperation({
        operationId: 'createCard',
        summary: 'create new card',
    })
    @ApiResponse({
        status: 200,
        description: 'create card success',
        type: [CreateCardOutputDto],
    })
    @Post()
    async debitAccount(@Body() createCard: CreateCardInputDto) {
        return this.bankCardService.createCard(createCard);
    }
}
