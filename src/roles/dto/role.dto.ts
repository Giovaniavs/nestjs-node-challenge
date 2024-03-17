import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Role } from '../domain/role';

export class RoleDto implements Role {
  @ApiProperty({ example: 2 })
  @IsNumber()
  id: number;
}
