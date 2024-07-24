import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecurringType1719778452504 implements MigrationInterface {
  name = 'RecurringType1719778452504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_expense_entity_recurringtype_enum" AS ENUM('yearly', 'monthly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ADD "recurringType" "public"."recurring_expense_entity_recurringtype_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_recurringtype_enum" AS ENUM('yearly', 'monthly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ADD "recurringType" "public"."recurring_income_entity_recurringtype_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" DROP COLUMN "recurringType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" DROP COLUMN "recurringType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_expense_entity_recurringtype_enum"`,
    );
  }
}
