import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';
import { Currency } from './create-account.dto';

export class ChangeAccountBalanceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;
}
