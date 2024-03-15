import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { OrdersEnum } from 'src/orders/orders.enum';
import { Order } from 'src/orders/infrastructure/persistence/relational/order.entity';

@Entity()
export class OrderItem extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrdersEnum,
    nullable: true,
  })
  orderStatus: OrdersEnum;

  @CreateDateColumn()
  orderCreateDate: Date;

  @Column('integer')
  amount: number;

  @Column('decimal')
  priceByUnity: number;

  @Column({ type: 'decimal', nullable: true })
  totalPrice: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalPrice() {
    this.totalPrice = this.amount * this.priceByUnity;
  }

  @ManyToOne(() => Order, {
    eager: true,
  })
  order?: Order;
}
