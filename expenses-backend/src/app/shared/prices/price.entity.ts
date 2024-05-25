import { Column } from 'typeorm';
import { IPrice } from './price';

export class PriceEntity implements IPrice {
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 12 })
  amount!: number;

  @Column({ nullable: false })
  currency!: string;
}
