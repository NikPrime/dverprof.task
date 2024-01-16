import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChangeAccountBalanceInputDto } from './dto/change-account-balance-input.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAccountOutputDto } from './dto/get-account-output.dto';
import { ChangeAccountBalanceOutputDto } from './dto/change-account-balance-output.dto';

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
        type: ChangeAccountBalanceOutputDto,
    })
    @Post('debit')
    async debitAccount(@Body() debitAccountDto: ChangeAccountBalanceInputDto) {
        return this.accountService.debitAccount(debitAccountDto);
    }

    @ApiOperation({
        operationId: 'topUpAccount',
        summary: 'top up account',
    })
    @ApiResponse({
        status: 200,
        description: 'Top up account success',
        type: ChangeAccountBalanceOutputDto,
    })
    @Post('topup')
    async topUpAccount(@Body() topUpAccountDto: ChangeAccountBalanceInputDto) {
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
