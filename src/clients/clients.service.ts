import { Injectable } from '@nestjs/common';
import { ClientRegisterDto } from './dto/client-register.dto';
import { ClientsRepository } from './infrastructure/persistence/clients.repository';
import { Client } from './domain/client';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(dto: ClientRegisterDto): Promise<Client> {
    const clonedPayload = {
      ...dto,
    };

    return this.clientsRepository.create(clonedPayload);
  }

  findOne(fields: EntityCondition<Client>): Promise<NullableType<Client>> {
    return this.clientsRepository.findOne(fields);
  }
}
