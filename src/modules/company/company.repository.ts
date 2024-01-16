import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

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

    create(id: string, newCompany: CreateCompanyDto) {
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
