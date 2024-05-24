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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RecurringIncomeEntity implements IRecurringIncome {
  @ApiProperty({
    description: 'Id of the income',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Monetary amount of the recurring income',
    required: true,
  })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;

  @ApiProperty({
    description: 'The category of the recurring income',
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
    description: 'User that the recurring income belongs to',
    required: true,
  })
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user!: UserEntity;

  @ApiProperty({
    description: 'Additional information about the recurring income',
    required: false,
  })
  @Column({ nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'The cron expression for this recurring income',
    required: true,
    example: '* * * * *',
  })
  @Column({ nullable: false })
  cron!: string;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring income',
    required: false,
  })
  @Column({ nullable: true, type: 'date' })
  startDate?: Date;

  @ApiProperty({
    description: 'The end date for the last execution of this recurring income',
    required: false,
  })
  @Column({ nullable: true, type: 'date' })
  endDate?: Date;

  @ApiProperty({
    description: 'The creation timestamp of this recurring income',
    required: true,
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({
    description: 'The last update timestamp of this recurring income',
    required: true,
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
