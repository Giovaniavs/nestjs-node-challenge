import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ClientRegisterDto } from './client-register.dto';
import { IsNotEmpty } from 'class-validator';

export class ClientUpdateDto extends PartialType(ClientRegisterDto) {
  @ApiProperty({ example: '+558192308553' })
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ example: 'Rua Ourém, 227' })
  @IsNotEmpty()
  address: string;
}
