import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductRegisterDto {
  @ApiProperty({ example: 'Xbox 360' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Video-game com vários jogos...' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 250 })
  @IsNotEmpty()
  availeble_ammount: number;
}
