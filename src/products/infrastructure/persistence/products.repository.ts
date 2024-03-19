import { Product } from 'src/products/domain/product';
import { ProductFindDto } from 'src/products/dto/product-find.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'typeorm';

export abstract class ProductsRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Product>;

  abstract findManyWithFilter({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: ProductFindDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]>;

  abstract delete(id: Product['id']): Promise<void>;

  abstract update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null>;
}
