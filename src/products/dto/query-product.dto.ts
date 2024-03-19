import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ProductFindDto } from './product-find.dto';

export class QueryProductDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String, example: '{"name": "Xbox 360"}' })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(ProductFindDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => ProductFindDto)
  filters?: ProductFindDto | null;
}
