import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { plainToClass } from 'class-transformer';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        private companyRepository: CompanyRepository,
    ) {}

    async createCompany(newCompany: CreateCompanyDto) {
        try {
            const existedCompany = await this.companyRepository.getCompanyByName(newCompany.name);
            if (existedCompany) throw new ConflictException(`Company with unique name ${newCompany.name} already existed`);

            const company = await this.companyRepository.create(uuidv4(), newCompany);

            return plainToClass(CreateAccountDto, company);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
