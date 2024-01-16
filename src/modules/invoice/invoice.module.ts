import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceRepository } from './invoice.repository';
import { CompanyModule } from '../company/company.module';

@Module({
    imports: [CompanyModule],
    controllers: [InvoiceController],
    providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
