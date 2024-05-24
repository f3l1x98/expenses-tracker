import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { IRecurringIncome } from './recurring-income';
import { IncomeCategory } from 'src/app/incomes/entities/income-category';

@Entity()
export class RecurringIncomeEntity implements IRecurringIncome {
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
