import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecurringExpenseEntity } from '../../recurring-expenses/entities/recurring-expense.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { ExpenseCategory, IExpense } from 'expenses-shared';

@Entity()
export class ExpenseEntity implements IExpense {
  @ApiProperty({
    description: 'Id of the expense',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Description the expense',
    required: true,
  })
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;

  @ApiProperty({
    description: 'The category of the expense',
    required: true,
    enum: ExpenseCategory,
  })
  @Column({
    nullable: false,
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.MISC,
  })
  category!: ExpenseCategory;

  @ApiProperty({
    description: 'User that the expense belongs to',
    required: true,
  })
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @ApiProperty({
    description: 'The recurring expense that created this expense',
    required: false,
  })
  @ManyToOne(() => RecurringExpenseEntity, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  recurringExpense?: RecurringExpenseEntity;

  @ApiProperty({
    description: 'The creation timestamp of this expense',
    required: true,
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({
    description: 'The last update timestamp of this expense',
    required: true,
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
