import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from './user';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false })
  @Index()
  username!: string;

  /**
   * Marked with select: false to ensure we need to manually select
   * this if needed and don't accidentially include it somewhere.
   */
  @Column({ nullable: false, select: false })
  password?: string;

  /**
   * Marked with select: false to ensure we need to manually select
   * this if needed and don't accidentially include it somewhere.
   */
  @Column({ nullable: false, select: false })
  salt?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
