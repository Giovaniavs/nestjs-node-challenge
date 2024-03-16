import { Expose } from 'class-transformer';

export class Client {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  contact: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
