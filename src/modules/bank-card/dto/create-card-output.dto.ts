import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { IsNumericString } from '../../../decorators/numeric-string';

export class CreateCardOutputDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    accountId: string;

    @ApiProperty()
    @IsNumericString()
    @Length(12, 12)
    @IsNotEmpty()
    cardNumber: string;
}
