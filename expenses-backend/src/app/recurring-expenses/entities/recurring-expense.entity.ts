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

@Entity()
export class RecurringExpenseEntity implements IRecurringExpense {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  amount!: number;

  // TODO strictly speaking repeated clothing expenses make no sense
  @Column({
    nullable: false,
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.INVOICE,
  })
  category!: ExpenseCategory;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: false })
  cron!: string;

  @Column({ nullable: true, type: 'date' })
  startDate?: Date;

  @Column({ nullable: true, type: 'date' })
  endDate?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
