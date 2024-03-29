import { PrismaService } from '../../db/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    register(id: string, email: string, password: string) {
        return this.prisma.user.create({
            data: {
                id,
                email,
                password,
            },
        });
    }

    getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    getById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                accounts: true,
            },
        });
    }
}
