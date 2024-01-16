import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompanyDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    checkingAccount: string;
}
