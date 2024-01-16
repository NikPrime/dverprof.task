import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../account/dto/create-account.dto';
import { InvoiceStatus } from '@prisma/client';
import { CompanyDto } from '../../company/dto/company.dto';

export class InvoiceDto {
    @IsNumber()
    @ApiProperty()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;

    @IsDateString()
    @ApiProperty()
    issuedDate: string;

    @IsDateString()
    @ApiProperty()
    dueDate: string;

    @ApiProperty()
    @IsEnum(InvoiceStatus)
    status: InvoiceStatus;

    @ApiProperty()
    @IsString()
    paymentDetails?: string;

    @ApiProperty({ type: CompanyDto })
    company: CompanyDto;
}
