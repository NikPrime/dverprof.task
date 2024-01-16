import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChangeAccountBalanceDto } from './dto/change-account-balance.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAccountOutputDto } from './dto/get-account-output.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @ApiOperation({
        operationId: 'debitAccount',
        summary: 'debit account',
    })
    @ApiResponse({
        status: 200,
        description: 'Debit account',
        type: ChangeAccountBalanceDto,
    })
    @Post('debit')
    async debitAccount(@Body() debitAccountDto: ChangeAccountBalanceDto) {
        return this.accountService.debitAccount(debitAccountDto);
    }

    @ApiOperation({
        operationId: 'topUpAccount',
        summary: 'top up account',
    })
    @ApiResponse({
        status: 200,
        description: 'Top up account success',
        type: ChangeAccountBalanceDto,
    })
    @Post('topup')
    async topUpAccount(@Body() topUpAccountDto: ChangeAccountBalanceDto) {
        return this.accountService.topUpAccount(topUpAccountDto);
    }

    @ApiOperation({
        operationId: 'getAccount',
        summary: 'get account by id',
    })
    @ApiResponse({
        status: 200,
        description: 'Get account by id success',
        type: GetAccountOutputDto,
    })
    @Get(':id')
    async getAccountById(@Param('id') id: string) {
        return this.accountService.getAccountById(id);
    }
}
