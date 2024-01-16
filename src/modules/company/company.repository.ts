import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateCompanyInputDto } from './dto/create-company-input.dto';

@Injectable()
export class CompanyRepository {
    constructor(private prisma: PrismaService) {}
    getCompanyByName(name: string) {
        return this.prisma.company.findFirst({
            where: {
                name,
            },
        });
    }

    getCompanyById(id: string) {
        return this.prisma.company.findUnique({
            where: {
                id,
            },
        });
    }

    create(id: string, newCompany: CreateCompanyInputDto) {
        const { name, checkingAccount, accountId } = newCompany;
        return this.prisma.company.create({
            data: {
                id,
                name,
                checkingAccount,
                accounts: {
                    connect: { id: accountId },
                },
            },
        });
    }
}
