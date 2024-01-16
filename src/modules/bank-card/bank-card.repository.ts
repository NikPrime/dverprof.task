import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateCardInputDto } from './dto/create-card-input.dto';

@Injectable()
export class BankCardRepository {
    constructor(private prisma: PrismaService) {}
    getCardByNumber(cardNumber: string) {
        return this.prisma.bankCard.findFirst({
            where: {
                cardNumber,
            },
        });
    }

    create(id: string, newCard: CreateCardInputDto) {
        const { cardNumber, cvv, expiryDate, accountId } = newCard;
        return this.prisma.bankCard.create({
            data: {
                id,
                cardNumber,
                expiryDate,
                cvv,
                accounts: {
                    create: [
                        {
                            account: {
                                connect: { id: accountId },
                            },
                        },
                    ],
                },
            },
        });
    }
}
