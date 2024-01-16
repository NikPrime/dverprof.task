import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
    @ApiProperty()
    cardNumber: string;
}
