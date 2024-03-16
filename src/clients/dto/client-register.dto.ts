import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClientRegisterDto {
  @ApiProperty({ example: '+558192308553' })
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ example: 'Rua Ourém, 227' })
  @IsNotEmpty()
  address: string;
}
