import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CardDto {
    @ApiProperty()
    cardNumber: string;
}
