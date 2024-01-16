import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
}

export class CreateAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @Min(0)
    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @ApiProperty()
    @IsEnum(Currency)
    @IsNotEmpty()
    currency: Currency;
}
