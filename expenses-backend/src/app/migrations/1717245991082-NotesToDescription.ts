import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotesToDescription1717245991082 implements MigrationInterface {
  name = 'NotesToDescription1717245991082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" RENAME COLUMN "notes" TO "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" RENAME COLUMN "notes" TO "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" RENAME COLUMN "notes" TO "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" RENAME COLUMN "notes" TO "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "description" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" RENAME COLUMN "description" TO "notes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" RENAME COLUMN "description" TO "notes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" RENAME COLUMN "description" TO "notes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" RENAME COLUMN "description" TO "notes"`,
    );
  }
}
