import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientRegisterDto } from './dto/client-register.dto';
import { Client } from './domain/client';
import { ClientsService } from './clients.service';

@ApiTags('Clients')
@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('clients/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() clientRegisterDto: ClientRegisterDto,
  ): Promise<Client> {
    return this.clientsService.create(clientRegisterDto);
  }
}
