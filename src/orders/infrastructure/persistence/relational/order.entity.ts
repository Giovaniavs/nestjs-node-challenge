import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { OrdersEnum } from 'src/orders/orders.enum';
import { ClientEntity } from 'src/clients/infrastructure/persistence/relational/entities/client.entity';

@Entity()
export class Order extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrdersEnum,
  })
  orderStatus: OrdersEnum;

  @ManyToOne(() => ClientEntity, {
    eager: true,
  })
  client?: ClientEntity;

  @CreateDateColumn()
  orderCreateDate: Date;

  @Column('decimal')
  totalOrderPrice: number;
}
