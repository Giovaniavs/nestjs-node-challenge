import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsRepository } from '../../products.repository';
import { ProductEntity } from '../entities/product.entity';
import { Product } from 'src/products/domain/product';
import { ProductMapper } from '../mappers/products.mapper';

@Injectable()
export class ProductsRelationalRepository implements ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const newEntity = await this.productsRepository.save(
      this.productsRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(newEntity);
  }

  // async findOne(
  //   fields: EntityCondition<Product>,
  // ): Promise<NullableType<Product>> {
  //   const entity = await this.productsRepository
  //     .createQueryBuilder('client')
  //     .where({
  //       id: fields.id,
  //     })
  //     .leftJoinAndSelect('client.user', 'user')
  //     .getOne();

  //   return entity ? ProductMapper.toDomain(entity) : null;
  // }

  async delete(id: Product['id']): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async update(id: Product['id'], payload: Partial<Product>): Promise<Product> {
    const entity = await this.productsRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('Product not found');
    }

    const updatedEntity = await this.productsRepository.save(
      this.productsRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }
}
