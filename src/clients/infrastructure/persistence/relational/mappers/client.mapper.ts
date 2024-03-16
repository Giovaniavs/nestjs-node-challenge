import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ClientEntity } from '../entities/client.entity';
import { Client } from 'src/clients/domain/client';

export class ClientMapper {
  static toDomain(raw: ClientEntity): Client {
    const client = new Client();
    client.id = raw.id;
    client.contact = raw.contact;
    client.address = raw.address;
    client.user = raw.user;
    client.createdAt = raw.createdAt;
    client.updatedAt = raw.createdAt;

    return client;
  }

  static toPersistence(client: Client): ClientEntity {
    let user: UserEntity | undefined = undefined;

    const clientEntity = new ClientEntity();
    if (client.id && typeof client.id === 'string') {
      clientEntity.id = client.id;
    }

    if (client.user) {
      user = new UserEntity();
      user.firstName = client.user.firstName;
      user.lastName = client.user.lastName;
      user.email = client.user.email;
    }

    clientEntity.contact = client.contact;
    clientEntity.address = client.address;
    clientEntity.createdAt = client.createdAt;
    clientEntity.user = user;
    clientEntity.updatedAt = client.updatedAt;
    return clientEntity;
  }
}
