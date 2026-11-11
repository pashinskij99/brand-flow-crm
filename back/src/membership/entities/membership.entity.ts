import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Business } from '../../business/entities/business.entity';

export enum ROLE {
  OWNER = 'owner',
  MANAGER = 'manager',
  PRODUCTION = ' production',
  VIEWER = 'viewer',
}
export enum STATUS {
  INVITED = 'invited',
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

@Entity('memberships')
@Unique(['user_id', 'business_id'])
export class Memberships {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  business_id!: string;

  @Column({ enum: ROLE })
  role!: ROLE;

  @Column({ enum: STATUS, default: STATUS.DISABLED })
  status!: STATUS;

  @ManyToOne(() => Users, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @ManyToOne(() => Business, (business) => business.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'business_id' })
  business!: Business;
}
