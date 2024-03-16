import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from '../../clients.repository';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { Client } from 'src/clients/domain/client';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class ClientsRelationalRepository implements ClientsRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly usersRepository: Repository<ClientEntity>,
  ) {}

  async create(data: Client): Promise<Client> {
    const persistenceModel = ClientMapper.toPersistence(data);
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel),
    );
    return ClientMapper.toDomain(newEntity);
  }
}
