import { IUser, IUserSettings, defaultSettings } from 'expenses-shared';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'jsonb', nullable: false, default: defaultSettings })
  settings!: IUserSettings;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
