import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Memberships } from '../../membership/entities/membership.entity';

export enum LOCALE {
  UK = 'uk',
  EN = 'en',
}

export enum VERIFICATION_STATUS {
  PENDING = 'pending_verification',
  ACTIVE = 'active',
  LOCKED = 'locked',
  DISABLED = 'disabled',
}

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: LOCALE.UK, enum: LOCALE })
  locale!: LOCALE;

  @Column({ type: 'date', nullable: true })
  email_verified_at!: Date;

  @Column({ enum: VERIFICATION_STATUS, nullable: true })
  status?: VERIFICATION_STATUS;

  @Column({ type: 'date', nullable: true })
  last_login_at?: Date;

  @OneToMany(() => Memberships, (memberships) => memberships.user, {
    nullable: true,
  })
  memberships?: Memberships[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
