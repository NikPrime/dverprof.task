import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyInputDto } from './dto/create-company-input.dto';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyOutputDto } from './dto/create-company-output.dto';
import { GetCompanyByNameOutputDto } from './dto/get-company-by-name-output.dto';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository) {}

    async createCompany(newCompany: CreateCompanyInputDto) {
        try {
            const existedCompany = await this.companyRepository.getCompanyByName(newCompany.name);
            if (existedCompany) throw new ConflictException(`Company with unique name ${newCompany.name} already existed`);

            const company = await this.companyRepository.create(uuidv4(), newCompany);

            return plainToClass(CreateCompanyOutputDto, company);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getCompanyByName(name: string) {
        try {
            const existedCompany = await this.companyRepository.getCompanyByName(name);
            if (!existedCompany) throw new NotFoundException('Company does not exists');

            return plainToClass(GetCompanyByNameOutputDto, {
                id: existedCompany.id,
                name: existedCompany.name,
                checkingAccount: existedCompany.checkingAccount,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getCompanyById(id: string) {
        try {
            const existedCompany = await this.companyRepository.getCompanyById(id);
            if (!existedCompany) throw new NotFoundException('Company does not exists');

            return plainToClass(CompanyDto, {
                id: existedCompany.id,
                name: existedCompany.name,
                checkingAccount: existedCompany.checkingAccount,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
