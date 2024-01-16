import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';
import { IsNumericString } from '../../../decorators/numeric-string';

export class CreateCardInputDto {
    @ApiProperty()
    @IsUUID()
    accountId: string;

    @ApiProperty()
    @IsNumericString()
    @Length(12, 12)
    cardNumber: string;

    @ApiProperty()
    @IsNumericString()
    @Length(4, 4)
    expiryDate: string;

    @ApiProperty()
    @IsNumericString()
    @Length(3, 3)
    cvv: string;
}
