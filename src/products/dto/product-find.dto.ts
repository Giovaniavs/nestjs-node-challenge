import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ProductFindDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  name?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  description?: string | null;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  price?: number | null;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  availeble_ammount?: number | null;
}
