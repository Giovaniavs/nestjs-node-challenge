import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from '../../clients.repository';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { Client } from 'src/clients/domain/client';
import { ClientMapper } from '../mappers/client.mapper';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class ClientsRelationalRepository implements ClientsRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
  ) {}

  async create(data: Client): Promise<Client> {
    const persistenceModel = ClientMapper.toPersistence(data);
    const newEntity = await this.clientsRepository.save(
      this.clientsRepository.create(persistenceModel),
    );
    return ClientMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<Client>,
  ): Promise<NullableType<Client>> {
    const entity = await this.clientsRepository
      .createQueryBuilder('client')
      .where({
        id: fields.id,
      })
      .leftJoinAndSelect('client.user', 'user')
      .getOne();

    return entity ? ClientMapper.toDomain(entity) : null;
  }

  async delete(id: Client['id']): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
