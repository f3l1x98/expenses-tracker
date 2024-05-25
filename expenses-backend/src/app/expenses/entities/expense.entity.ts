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
import { ApiProperty } from '@nestjs/swagger';
import { PriceEntity } from 'src/app/shared/prices/price.entity';

@Entity()
export class ExpenseEntity implements IExpense {
  @ApiProperty({
    description: 'Id of the expense',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /*@ApiProperty({
    description: 'Monetary amount of the expense',
    required: true,
  })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;*/
  @Column(() => PriceEntity)
  price!: PriceEntity;

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
    description: 'Additional information about the expense',
    required: false,
  })
  @Column({ nullable: true })
  notes?: string;

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
