import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsService } from './clients.service';
import { RelationalClientPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalClientPersistenceModule, ConfigModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService, RelationalClientPersistenceModule],
})
export class ClientsModule {}
