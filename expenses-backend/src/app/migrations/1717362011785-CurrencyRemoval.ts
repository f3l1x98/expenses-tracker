import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurrencyRemoval1717362011785 implements MigrationInterface {
  name = 'CurrencyRemoval1717362011785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" RENAME COLUMN "priceAmount" TO "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" DROP COLUMN "priceCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" RENAME COLUMN "priceAmount" TO "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" DROP COLUMN "priceCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" RENAME COLUMN "priceAmount" TO "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" DROP COLUMN "priceCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" RENAME COLUMN "priceAmount" TO "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" DROP COLUMN "priceCurrency"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income_entity" ADD "priceCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" RENAME COLUMN "amount" TO "priceAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ADD "priceCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" RENAME COLUMN "amount" TO "priceAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" ADD "priceCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" RENAME COLUMN "amount" TO "priceAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ADD "priceCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" RENAME COLUMN "amount" TO "priceAmount"`,
    );
  }
}
