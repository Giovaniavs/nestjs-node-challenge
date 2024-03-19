import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ProductRegisterDto } from './dto/product-register.dto';
import { Product } from './domain/product';
import { ProductsRepository } from './infrastructure/persistence/products.repository';
import { ProductFindDto } from './dto/product-find.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class ProductsService {
  constructor(private producsRepository: ProductsRepository) {}

  async create(dto: ProductRegisterDto): Promise<Product> {
    const clonedPayload = {
      ...dto,
    };

    return this.producsRepository.create(clonedPayload);
  }

  findManyWithFilter({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: ProductFindDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    return this.producsRepository.findManyWithFilter({
      filterOptions,
      paginationOptions,
    });
  }

  async delete(id: Product['id']): Promise<void> {
    await this.producsRepository.delete(id);
  }

  update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null> {
    const clonedPayload = { ...payload };

    return this.producsRepository.update(id, clonedPayload);
  }
}
