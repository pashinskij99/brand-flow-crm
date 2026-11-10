import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import slugify from 'slugify';
import { Memberships } from '../../membership/entities/membership.entity';

export enum STATUS {
  TRIAL = 'trial',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum PLAN {
  STARTER = 'starter',
  STUDIO = 'studio',
  BRAND = 'brand',
}

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ name: 'logo_file_id', nullable: true })
  logoFileId?: string;

  @Column({ default: 'UAH' })
  currency!: string;

  @Column({ enum: STATUS, default: STATUS.TRIAL })
  status!: STATUS;

  @Column({
    name: 'trial_ends_at',
    type: 'date',
    nullable: true,
  })
  trialEndsAt?: Date;

  @Column({ enum: PLAN, nullable: true })
  plan?: PLAN;

  @Column({
    name: 'onboarding_done',
    type: 'boolean',
    default: false,
  })
  onboardingDone!: boolean;

  @Column({ name: 'allow_backorder', type: 'boolean', default: false })
  allowBackorder!: boolean;

  @Column({ name: 'low_stock_threshold', type: 'int', default: 2 })
  lowStockThreshold!: number;

  @Column({ name: 'discount_warning_percent', type: 'int', nullable: true })
  discountWarningPercent?: number;

  @Column({ type: 'int', nullable: true })
  order_number_next?: number;

  @OneToMany(() => Memberships, (memberships) => memberships.business, {
    nullable: true,
  })
  memberships?: Memberships[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, {
        lower: true,
        strict: true,
        trim: true,
      });
    }
  }
}
