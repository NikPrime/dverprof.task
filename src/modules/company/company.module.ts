import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';

@Module({
    providers: [CompanyService, CompanyRepository],
    controllers: [CompanyController],
    exports: [CompanyService],
})
export class CompanyModule {}
