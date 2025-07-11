import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuarterlyRecurringType1752264777541 implements MigrationInterface {
  name = 'QuarterlyRecurringType1752264777541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_expense_entity_recurringtype_enum" RENAME TO "recurring_expense_entity_recurringtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_expense_entity_recurringtype_enum" AS ENUM('yearly', 'monthly', 'quarterly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ALTER COLUMN "recurringType" TYPE "public"."recurring_expense_entity_recurringtype_enum" USING "recurringType"::"text"::"public"."recurring_expense_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_expense_entity_recurringtype_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_income_entity_recurringtype_enum" RENAME TO "recurring_income_entity_recurringtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_recurringtype_enum" AS ENUM('yearly', 'monthly', 'quarterly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "recurringType" TYPE "public"."recurring_income_entity_recurringtype_enum" USING "recurringType"::"text"::"public"."recurring_income_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_recurringtype_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_recurringtype_enum_old" AS ENUM('yearly', 'monthly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "recurringType" TYPE "public"."recurring_income_entity_recurringtype_enum_old" USING "recurringType"::"text"::"public"."recurring_income_entity_recurringtype_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_income_entity_recurringtype_enum_old" RENAME TO "recurring_income_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_expense_entity_recurringtype_enum_old" AS ENUM('yearly', 'monthly', 'weekly', 'custom')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ALTER COLUMN "recurringType" TYPE "public"."recurring_expense_entity_recurringtype_enum_old" USING "recurringType"::"text"::"public"."recurring_expense_entity_recurringtype_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_expense_entity_recurringtype_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_expense_entity_recurringtype_enum_old" RENAME TO "recurring_expense_entity_recurringtype_enum"`,
    );
  }
}
