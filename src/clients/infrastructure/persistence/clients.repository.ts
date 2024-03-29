import { Client } from 'src/clients/domain/client';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';

export abstract class ClientsRepository {
  abstract create(
    data: Omit<Client, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Client>;

  abstract findOne(
    fields: EntityCondition<Client>,
  ): Promise<NullableType<Client>>;

  abstract delete(id: Client['id']): Promise<void>;

  abstract update(
    id: Client['id'],
    payload: DeepPartial<Client>,
  ): Promise<Client | null>;
}
