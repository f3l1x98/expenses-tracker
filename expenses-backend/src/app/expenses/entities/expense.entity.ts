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
import { ExpenseCategory } from './expense-category';
import { IExpense } from './expense';
import { RecurringExpenseEntity } from '../../recurring-expenses/entities/recurring-expense.entity';

@Entity()
export class ExpenseEntity implements IExpense {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.MISC,
  })
  category!: ExpenseCategory;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => RecurringExpenseEntity, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  recurringExpense?: RecurringExpenseEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
