import { Product } from 'src/products/domain/product';
import { DeepPartial } from 'typeorm';

export abstract class ProductsRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Product>;

  // abstract findOne(
  //   fields: EntityCondition<Product>,
  // ): Promise<NullableType<Product>>;

  abstract delete(id: Product['id']): Promise<void>;

  abstract update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null>;
}
