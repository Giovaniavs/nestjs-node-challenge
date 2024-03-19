import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ProductsRepository } from '../../products.repository';
import { ProductEntity } from '../entities/product.entity';
import { Product } from 'src/products/domain/product';
import { ProductMapper } from '../mappers/products.mapper';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ProductFindDto } from 'src/products/dto/product-find.dto';

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

  async findManyWithFilter({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: ProductFindDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const where: FindOptionsWhere<ProductEntity> = {};

    if (filterOptions?.name) {
      where.name = Like(`%${filterOptions.name}%`);
    }

    if (filterOptions?.price) {
      where.price = filterOptions.price;
    }

    if (filterOptions?.availeble_ammount) {
      where.availeble_ammount = filterOptions.availeble_ammount;
    }

    if (filterOptions?.description) {
      where.description = filterOptions.description;
    }

    const entities = await this.productsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    return entities.map((product) => ProductMapper.toDomain(product));
  }

  async delete(id: Product['id']): Promise<void> {
    const entity = await this.productsRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('Product not found');
    }

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
