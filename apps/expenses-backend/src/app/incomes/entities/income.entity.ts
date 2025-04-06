import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RecurringIncomeEntity } from '../../recurring-incomes/entities/recurring-income.entitiy';
import { UserEntity } from '../../users/entities/user.entity';
import { IIncome, IncomeCategory } from 'expenses-shared';
import { NumericColumnTransformer } from '../../shared/numeric_column_transformer';

@Entity()
export class IncomeEntity implements IIncome {
  @ApiProperty({
    description: 'Id of the income',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Description the income',
    required: true,
  })
  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: false,
    type: 'decimal',
    scale: 2,
    precision: 12,
    transformer: new NumericColumnTransformer(),
  })
  amount!: number;

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
