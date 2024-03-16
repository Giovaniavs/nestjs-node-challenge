import { Client } from 'src/clients/domain/client';

export abstract class ClientsRepository {
  abstract create(
    data: Omit<Client, 'id' | 'name' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Client>;
}
