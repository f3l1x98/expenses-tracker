import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExpenseCategory } from '../../expenses/entities/expense-category';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { IRecurringExpense } from './recurring-expense';
import { ApiProperty } from '@nestjs/swagger';
import { PriceEntity } from 'src/app/shared/prices/price.entity';

@Entity()
export class RecurringExpenseEntity implements IRecurringExpense {
  @ApiProperty({
    description: 'Id of the recurring expense',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /*@ApiProperty({
    description: 'Monetary amount of the recurring expense',
    required: true,
  })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;*/
  @Column(() => PriceEntity)
  price!: PriceEntity;

  // TODO strictly speaking repeated clothing expenses make no sense
  @ApiProperty({
    description: 'The category of the recurring expense',
    required: true,
    enum: ExpenseCategory,
  })
  @Column({
    nullable: false,
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.INVOICE,
  })
  category!: ExpenseCategory;

  @ApiProperty({
    description: 'User that the recurring expense belongs to',
    required: true,
  })
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @ApiProperty({
    description: 'Additional information about the recurring expense',
    required: true,
  })
  @Column({ nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'The cron expression for this recurring expense',
    required: true,
    example: '* * * * *',
  })
  @Column({ nullable: false })
  cron!: string;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring expense',
    required: false,
  })
  @Column({ nullable: true, type: 'date' })
  startDate?: Date;

  @ApiProperty({
    description:
      'The end date for the last execution of this recurring expense',
    required: false,
  })
  @Column({ nullable: true, type: 'date' })
  endDate?: Date;

  @ApiProperty({
    description: 'The creation timestamp of this recurring expense',
    required: true,
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({
    description: 'The last update timestamp of this recurring expense',
    required: true,
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
