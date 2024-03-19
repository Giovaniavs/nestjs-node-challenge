import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductRegisterDto } from './product-register.dto';

export class ProductUpdateDto extends PartialType(ProductRegisterDto) {
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
