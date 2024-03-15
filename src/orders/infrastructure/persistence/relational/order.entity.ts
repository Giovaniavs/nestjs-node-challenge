import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { OrdersEnum } from 'src/orders/orders.enum';
import { Client } from 'src/clients/infrastructure/persistence/relational/client.entity';

@Entity()
export class Order extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrdersEnum,
  })
  orderStatus: OrdersEnum;

  @ManyToOne(() => Client, {
    eager: true,
  })
  client?: Client;

  @CreateDateColumn()
  orderCreateDate: Date;

  @Column('decimal')
  totalOrderPrice: number;
}
