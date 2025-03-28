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
import { UserEntity } from '../../users/entities/user.entity';
import { ExpenseCategory, IRecurringExpense } from 'expenses-shared';
import { RecurringType } from 'expenses-shared';
import { CronExpressionParser } from 'cron-parser';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class RecurringExpenseEntity implements IRecurringExpense {
  @ApiProperty({
    description: 'Id of the recurring expense',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Description the recurring expense',
    required: true,
  })
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;

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
    description: 'The cron expression for this recurring expense',
    required: true,
    example: '* * * * *',
  })
  @Column({ nullable: false })
  @Exclude()
  cron!: string;

  @ApiProperty({
    description: 'The date of the next execution of this recurring expense',
    required: true,
  })
  @Expose()
  get nextExecution(): Date {
    const interval = CronExpressionParser.parse(this.cron, {
      currentDate: this.startDate ?? new Date(),
    });
    return new Date(interval.next().toDate().toDateString());
  }

  @ApiProperty({
    description: 'The recurring type of this recurring expense',
    required: true,
    enum: RecurringType,
  })
  @Column({
    nullable: false,
    type: 'enum',
    enum: RecurringType,
  })
  recurringType!: RecurringType;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring expense',
    required: false,
  })
  @Column({ nullable: true, type: 'timestamptz' })
  startDate?: Date;

  @ApiProperty({
    description:
      'The end date for the last execution of this recurring expense',
    required: false,
  })
  @Column({ nullable: true, type: 'timestamptz' })
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
