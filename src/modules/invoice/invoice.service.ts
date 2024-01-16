import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInvoiceInputDto } from './dto/create-invoice-input.dto';
import { InvoiceRepository } from './invoice.repository';
import { CompanyService } from '../company/company.service';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceStatus } from '@prisma/client';
import { CreateInvoiceOutputDto } from './dto/create-invoice-output.dto';

@Injectable()
export class InvoiceService {
    constructor(
        private invoiceRepository: InvoiceRepository,
        private companyService: CompanyService,
    ) {}

    async getInvoicesByCompanyId(id: string) {
        try {
            const invoices = await this.invoiceRepository.getAllByCompanyId(id);

            return invoices.map((invoice) =>
                plainToClass(InvoiceDto, {
                    amount: invoice.amount,
                    currency: invoice.currency,
                    issuedDate: invoice.issuedDate,
                    dueDate: invoice.dueDate,
                    status: invoice.status,
                    paymentDetails: invoice.paymentDetails,
                    company: {
                        name: invoice.company.name,
                        checkingAccount: invoice.company.checkingAccount,
                    },
                }),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async createInvoice(invoice: CreateInvoiceInputDto) {
        try {
            const existedCompany = await this.companyService.getCompanyById(invoice.companyId);
            if (!existedCompany) throw new NotFoundException('Company does not exists');

            const newInvoice = await this.invoiceRepository.create(uuidv4(), invoice, InvoiceStatus.WAITING);

            return plainToClass(CreateInvoiceOutputDto, {
                companyId: newInvoice.companyId,
                amount: newInvoice.amount,
                currency: newInvoice.currency,
                issuedDate: newInvoice.issuedDate,
                dueDate: newInvoice.dueDate,
                status: newInvoice.status,
                paymentsDetails: newInvoice.paymentDetails,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
