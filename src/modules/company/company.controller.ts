import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    async debitAccount(@Body() createCompany: CreateCompanyDto) {
        return this.companyService.createCompany(createCompany);
    }
}
