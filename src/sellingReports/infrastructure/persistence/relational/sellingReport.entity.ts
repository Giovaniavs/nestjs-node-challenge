import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity()
export class SellingReport extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  period: Date;

  @Column('decimal')
  totalValue: number;

  @Column('integer')
  productAmount: number;

  @Column()
  reportFilePath: string;
}
