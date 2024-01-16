import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';
import { IsNumericString } from '../../../decorators/numeric-string';

export class CreateCardOutputDto {
    @ApiProperty()
    @IsUUID()
    accountId: string;

    @ApiProperty()
    @IsNumericString()
    @Length(12, 12)
    cardNumber: string;
}
