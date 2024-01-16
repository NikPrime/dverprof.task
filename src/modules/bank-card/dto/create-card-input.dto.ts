import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { IsPositiveNumericString } from '../../../decorators/numeric-string';

export class CreateCardInputDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    accountId: string;

    @ApiProperty()
    @IsPositiveNumericString()
    @IsNotEmpty()
    @Length(16, 16)
    cardNumber: string;

    @ApiProperty()
    @IsPositiveNumericString()
    @IsNotEmpty()
    @Length(4, 4)
    expiryDate: string;

    @ApiProperty()
    @IsPositiveNumericString()
    @IsNotEmpty()
    @Length(3, 3)
    cvv: string;
}
