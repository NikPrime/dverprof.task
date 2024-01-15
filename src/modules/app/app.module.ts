import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../../db/prisma/prisma.module';

@Module({
    imports: [UserModule, AccountModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
