import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateInvoiceInputDto } from './dto/create-invoice-input.dto';
import { InvoiceStatus } from '@prisma/client';

@Injectable()
export class InvoiceRepository {
    constructor(private prisma: PrismaService) {}

    getAllByCompanyId(companyId: string) {
        return this.prisma.invoice.findMany({
            where: {
                companyId,
            },
            include: {
                company: true,
            },
        });
    }

    create(id: string, newInvoice: CreateInvoiceInputDto, status: InvoiceStatus) {
        return this.prisma.invoice.create({
            data: {
                id,
                status,
                ...newInvoice,
            },
        });
    }
}
