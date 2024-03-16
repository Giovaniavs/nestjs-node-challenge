import { ClientEntity } from '../entities/client.entity';
import { Client } from 'src/clients/domain/client';

export class ClientMapper {
  static toDomain(raw: ClientEntity): Client {
    const client = new Client();
    client.id = raw.id;
    client.contact = raw.contact;
    client.address = raw.address;
    client.createdAt = raw.createdAt;
    client.updatedAt = raw.createdAt;

    return client;
  }

  static toPersistence(client: Client): ClientEntity {
    const clientEntity = new ClientEntity();
    if (client.id && typeof client.id === 'string') {
      clientEntity.id = client.id;
    }

    clientEntity.contact = client.contact;
    clientEntity.address = client.address;
    clientEntity.createdAt = client.createdAt;
    clientEntity.updatedAt = client.updatedAt;
    return clientEntity;
  }
}
