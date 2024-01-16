import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Currency } from './create-account.dto';

export class AccountDto {
    @ApiProperty()
    @IsNumber()
    balance: number;

    @ApiProperty()
    @IsEnum(Currency)
    currency: Currency;
}
