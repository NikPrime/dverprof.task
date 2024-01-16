import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { AccountDto } from '../../account/dto/account.dto';

export class UserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: [AccountDto] })
    accounts: AccountDto[];
}
