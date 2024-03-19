import { Expose } from 'class-transformer';

export class Product {
  id: string;

  @Expose({ groups: ['me', 'admin'] })
  name: string;
  description: string;
  price: number;
  availeble_ammount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Product>) {
    Object.assign(this, data);
  }
}
