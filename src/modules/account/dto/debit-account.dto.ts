import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';
import { Currency } from './create-account.dto';

export class DebitAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsEnum(Currency)
    currency: Currency;
}
