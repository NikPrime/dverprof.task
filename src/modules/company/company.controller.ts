import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from './dto/company.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @ApiOperation({
        operationId: 'createCompany',
        summary: 'create company',
    })
    @ApiResponse({
        status: 200,
        description: 'create company success',
        type: CreateCompanyDto,
    })
    @Post()
    async createCompany(@Body() createCompany: CreateCompanyDto) {
        return this.companyService.createCompany(createCompany);
    }

    @ApiOperation({
        operationId: 'getCompanyByName',
        summary: 'get company by name',
    })
    @ApiResponse({
        status: 200,
        description: 'get company by name',
        type: CompanyDto,
    })
    @Get(':name')
    async getCompanyByName(@Param('name') name: string) {
        return this.companyService.getCompanyByName(name);
    }
}
