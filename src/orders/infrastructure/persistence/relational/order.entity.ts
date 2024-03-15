import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { OrdersEnum } from 'src/orders/orders.enum';

@Entity()
export class Order extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrdersEnum,
  })
  orderStatus: OrdersEnum;

  @CreateDateColumn()
  orderCreateDate: Date;

  @Column('decimal')
  totalOrderPrice: number;
}
