import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Client } from 'src/clients/domain/client';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

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

  @OneToOne(() => UserEntity, {
    eager: true,
  })
  user?: UserEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
