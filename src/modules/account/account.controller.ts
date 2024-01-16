import { Body, Controller, Post } from '@nestjs/common';
import { DebitAccountDto } from './dto/debit-account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('debit')
    async debitAccount(@Body() debitAccountDto: DebitAccountDto) {
        return this.accountService.debitAccount(debitAccountDto);
    }
}
