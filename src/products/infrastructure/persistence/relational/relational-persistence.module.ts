import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsRepository } from '../products.repository';
import { ProductsRelationalRepository } from './repositories/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: ProductsRepository,
      useClass: ProductsRelationalRepository,
    },
  ],
  exports: [ProductsRepository],
})
export class RelationalProductPersistenceModule {}
