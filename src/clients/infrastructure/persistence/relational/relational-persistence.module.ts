import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsRepository } from '../clients.repository';
import { ClientEntity } from './entities/client.entity';
import { ClientsRelationalRepository } from './repositories/clients.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [
    {
      provide: ClientsRepository,
      useClass: ClientsRelationalRepository,
    },
  ],
  exports: [ClientsRepository],
})
export class RelationalClientPersistenceModule {}
