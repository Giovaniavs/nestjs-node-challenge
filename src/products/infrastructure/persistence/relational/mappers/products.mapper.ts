import { ProductEntity } from '../entities/product.entity';
import { Product } from 'src/products/domain/product';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const product = new Product();
    product.id = raw.id;
    product.name = raw.name;
    product.price = raw.price;
    product.availeble_ammount = raw.availeble_ammount;
    product.createdAt = raw.createdAt;
    product.updatedAt = raw.createdAt;

    return product;
  }

  static toPersistence(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    if (product.id && typeof product.id === 'string') {
      productEntity.id = product.id;
    }

    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.description = product.description;
    productEntity.availeble_ammount = product.availeble_ammount;
    productEntity.createdAt = product.createdAt;
    productEntity.updatedAt = product.updatedAt;
    return productEntity;
  }
}
