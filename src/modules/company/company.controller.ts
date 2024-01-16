import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyInputDto } from './dto/create-company-input.dto';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyOutputDto } from './dto/create-company-output.dto';
import { GetCompanyByNameOutputDto } from './dto/get-company-by-name-output.dto';

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
        type: CreateCompanyOutputDto,
    })
    @Post()
    async createCompany(@Body() createCompany: CreateCompanyInputDto) {
        return this.companyService.createCompany(createCompany);
    }

    @ApiOperation({
        operationId: 'getCompanyByName',
        summary: 'get company by name',
    })
    @ApiResponse({
        status: 200,
        description: 'get company by name',
        type: GetCompanyByNameOutputDto,
    })
    @Get(':name')
    async getCompanyByName(@Param('name') name: string) {
        return this.companyService.getCompanyByName(name);
    }
}
