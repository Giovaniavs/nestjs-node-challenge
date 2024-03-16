import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Client } from 'src/clients/domain/client';

@Entity({
  name: 'client',
})
export class ClientEntity extends EntityRelationalHelper implements Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contact: string;

  @Column('text')
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
