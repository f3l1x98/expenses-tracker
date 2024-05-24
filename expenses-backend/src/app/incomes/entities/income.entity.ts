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

@Entity()
export class IncomeEntity implements IIncome {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  amount!: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: IncomeCategory,
    default: IncomeCategory.SALARY,
  })
  category!: IncomeCategory;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => RecurringIncomeEntity, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  recurringIncome?: RecurringIncomeEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
