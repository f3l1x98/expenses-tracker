import { UserEntity } from 'src/app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IncomeCategory } from './income-category';
import { IIncome } from './income';
import { RecurringIncomeEntity } from 'src/app/recurring-incomes/entities/recurring-income.entitiy';
import { ApiProperty } from '@nestjs/swagger';
import { PriceEntity } from 'src/app/shared/prices/price.entity';

@Entity()
export class IncomeEntity implements IIncome {
  @ApiProperty({
    description: 'Id of the income',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column(() => PriceEntity)
  price!: PriceEntity;

  @ApiProperty({
    description: 'The category of the income',
    required: true,
    enum: IncomeCategory,
  })
  @Column({
    nullable: false,
    type: 'enum',
    enum: IncomeCategory,
    default: IncomeCategory.SALARY,
  })
  category!: IncomeCategory;

  @ApiProperty({
    description: 'User that the income belongs to',
    required: true,
  })
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @ApiProperty({
    description: 'Additional information about the income',
    required: false,
  })
  @Column({ nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'The recurring income that created this income',
    required: false,
  })
  @ManyToOne(() => RecurringIncomeEntity, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  recurringIncome?: RecurringIncomeEntity;

  @ApiProperty({
    description: 'The creation timestamp of this income',
    required: true,
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({
    description: 'The last update timestamp of this income',
    required: true,
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
