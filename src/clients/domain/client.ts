import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/user';

export class Client {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  contact: string;
  address: string;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
}
