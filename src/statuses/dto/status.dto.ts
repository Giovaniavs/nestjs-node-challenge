import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../domain/status';
import { IsNumber } from 'class-validator';

export class StatusDto implements Status {
  @ApiProperty({ example: 2 })
  @IsNumber()
  id: number;
}
