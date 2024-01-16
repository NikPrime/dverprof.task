import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../account/dto/create-account.dto';
import { InvoiceStatus } from '@prisma/client';

export class CreateInvoiceOutputDto {
    @IsString()
    @ApiProperty()
    companyId: string;

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
    @IsString()
    paymentDetails?: string;

    @ApiProperty()
    @IsEnum(InvoiceStatus)
    status: InvoiceStatus;
}
