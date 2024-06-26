import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncomeCategoryExtension1719404768848
  implements MigrationInterface
{
  name = 'IncomeCategoryExtension1719404768848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_income_entity_category_enum" RENAME TO "recurring_income_entity_category_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_category_enum" AS ENUM('salary', 'gift', 'misc')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" TYPE "public"."recurring_income_entity_category_enum" USING "category"::"text"::"public"."recurring_income_entity_category_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" SET DEFAULT 'salary'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_category_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."income_entity_category_enum" RENAME TO "income_entity_category_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."income_entity_category_enum" AS ENUM('salary', 'gift', 'misc')`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" TYPE "public"."income_entity_category_enum" USING "category"::"text"::"public"."income_entity_category_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" SET DEFAULT 'salary'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."income_entity_category_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."income_entity_category_enum_old" AS ENUM('salary')`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" TYPE "public"."income_entity_category_enum_old" USING "category"::"text"::"public"."income_entity_category_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ALTER COLUMN "category" SET DEFAULT 'salary'`,
    );
    await queryRunner.query(`DROP TYPE "public"."income_entity_category_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."income_entity_category_enum_old" RENAME TO "income_entity_category_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_category_enum_old" AS ENUM('salary')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" TYPE "public"."recurring_income_entity_category_enum_old" USING "category"::"text"::"public"."recurring_income_entity_category_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ALTER COLUMN "category" SET DEFAULT 'salary'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_category_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."recurring_income_entity_category_enum_old" RENAME TO "recurring_income_entity_category_enum"`,
    );
  }
}
