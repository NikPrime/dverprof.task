import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Currency } from './create-account.dto';
import { CompanyDto } from '../../company/dto/company.dto';
import { CardDto } from '../../bank-card/dto/card.dto';

export class GetAccountOutputDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty({ type: CompanyDto })
    company: CompanyDto;

    @ApiProperty({ type: [CardDto] })
    cards: CardDto[];
}
