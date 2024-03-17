import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  SerializeOptions,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ClientRegisterDto } from './dto/client-register.dto';
import { Client } from './domain/client';
import { ClientsService } from './clients.service';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/utils/types/nullable.type';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { ClientUpdateDto } from './dto/client-update.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Clients')
@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() clientRegisterDto: ClientRegisterDto,
  ): Promise<Client> {
    return this.clientsService.create(clientRegisterDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Client['id']): Promise<NullableType<Client>> {
    return this.clientsService.findOne({ id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Client['id']): Promise<void> {
    return this.clientsService.delete(id);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Client['id'],
    @Body() updateProfileDto: ClientUpdateDto,
  ): Promise<Client | null> {
    return this.clientsService.update(id, updateProfileDto);
  }
}
