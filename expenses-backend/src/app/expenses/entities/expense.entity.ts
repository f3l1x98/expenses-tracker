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
import { AutoMap } from '@automapper/classes';

@Entity()
export class ExpenseEntity implements IExpense {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id!: string;

  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  @AutoMap()
  amount!: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.MISC,
  })
  @AutoMap()
  category!: ExpenseCategory;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  @AutoMap(() => UserEntity)
  user!: UserEntity;

  @Column({ nullable: true })
  @AutoMap()
  notes?: string;

  @ManyToOne(() => RecurringExpenseEntity, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  @AutoMap(() => RecurringExpenseEntity)
  recurringExpense?: RecurringExpenseEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  @AutoMap()
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @AutoMap()
  updatedAt!: Date;
}
