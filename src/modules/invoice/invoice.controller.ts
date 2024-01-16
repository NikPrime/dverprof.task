import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceInputDto } from './dto/create-invoice-input.dto';
import { InvoiceDto } from './dto/invoice.dto';
import { CreateInvoiceOutputDto } from './dto/create-invoice-output.dto';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @ApiOperation({
        operationId: 'getInvoices',
        summary: 'get invoices by company id',
    })
    @ApiResponse({
        status: 200,
        description: 'get invoices by company id success',
        type: [InvoiceDto],
    })
    @Get(':id')
    async getInvoicesByCompanyId(@Param('id') id: string) {
        return this.invoiceService.getInvoicesByCompanyId(id);
    }

    @ApiOperation({
        operationId: 'createInvoice',
        summary: 'create invoice',
    })
    @ApiResponse({
        status: 200,
        description: 'create invoice success',
        type: CreateInvoiceOutputDto,
    })
    @Post()
    async createInvoice(@Body() invoice: CreateInvoiceInputDto) {
        return this.invoiceService.createInvoice(invoice);
    }
}
