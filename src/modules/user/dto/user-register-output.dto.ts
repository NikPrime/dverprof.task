import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterOutputDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
