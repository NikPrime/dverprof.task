import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetCompanyByNameOutputDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    checkingAccount: string;
}
