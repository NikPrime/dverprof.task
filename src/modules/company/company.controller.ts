import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    async debitAccount(@Body() createCompany: CreateCompanyDto) {
        return this.companyService.createCompany(createCompany);
    }
}
