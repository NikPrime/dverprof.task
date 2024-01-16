import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { IsNumericString } from '../../../decorators/numeric-string';

export class CreateCardInputDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    accountId: string;

    @ApiProperty()
    @IsNumericString()
    @IsNotEmpty()
    @Length(16, 16)
    cardNumber: string;

    @ApiProperty()
    @IsNumericString()
    @IsNotEmpty()
    @Length(4, 4)
    expiryDate: string;

    @ApiProperty()
    @IsNumericString()
    @IsNotEmpty()
    @Length(3, 3)
    cvv: string;
}
