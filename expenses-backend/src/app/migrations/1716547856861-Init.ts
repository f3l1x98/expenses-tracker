import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1716547856861 implements MigrationInterface {
  name = 'Init1716547856861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b998bada7cff93fcb953b0c37" ON "user_entity" ("username") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_expense_entity_category_enum" AS ENUM('car', 'invoice', 'clothing', 'entertainment', 'grocery', 'healthcare', 'vacation', 'misc')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recurring_expense_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "category" "public"."recurring_expense_entity_category_enum" NOT NULL DEFAULT 'invoice', "notes" character varying, "cron" character varying NOT NULL, "startDate" date, "endDate" date, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c22417a6d5383f27685188ddd23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."expense_entity_category_enum" AS ENUM('car', 'invoice', 'clothing', 'entertainment', 'grocery', 'healthcare', 'vacation', 'misc')`,
    );
    await queryRunner.query(
      `CREATE TABLE "expense_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "category" "public"."expense_entity_category_enum" NOT NULL DEFAULT 'misc', "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "recurringExpenseId" uuid, CONSTRAINT "PK_925dcb90c5f37e7ee13141379fa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_income_entity_category_enum" AS ENUM('salary')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recurring_income_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "category" "public"."recurring_income_entity_category_enum" NOT NULL DEFAULT 'salary', "notes" character varying, "cron" character varying NOT NULL, "startDate" date, "endDate" date, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_739fa03b2454d61a4ef017fc8ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."income_entity_category_enum" AS ENUM('salary')`,
    );
    await queryRunner.query(
      `CREATE TABLE "income_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "category" "public"."income_entity_category_enum" NOT NULL DEFAULT 'salary', "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "recurringIncomeId" uuid, CONSTRAINT "PK_14a9aa8770e3b7ee0f1bf48e475" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" ADD CONSTRAINT "FK_a5d330a8d5aa2a3b5f3ec7e8995" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" ADD CONSTRAINT "FK_111aae380446a094fd326fcc442" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" ADD CONSTRAINT "FK_0d6e0bada1c52a0236a9598dcf5" FOREIGN KEY ("recurringExpenseId") REFERENCES "recurring_expense_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" ADD CONSTRAINT "FK_0f27deccaa7511a053c13c6255b" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ADD CONSTRAINT "FK_778a17235d99283cb57dc0cccd2" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" ADD CONSTRAINT "FK_40c375d5914ca1f1c4b9eb19e7d" FOREIGN KEY ("recurringIncomeId") REFERENCES "recurring_income_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income_entity" DROP CONSTRAINT "FK_40c375d5914ca1f1c4b9eb19e7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_entity" DROP CONSTRAINT "FK_778a17235d99283cb57dc0cccd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_income_entity" DROP CONSTRAINT "FK_0f27deccaa7511a053c13c6255b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" DROP CONSTRAINT "FK_0d6e0bada1c52a0236a9598dcf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_entity" DROP CONSTRAINT "FK_111aae380446a094fd326fcc442"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_expense_entity" DROP CONSTRAINT "FK_a5d330a8d5aa2a3b5f3ec7e8995"`,
    );
    await queryRunner.query(`DROP TABLE "income_entity"`);
    await queryRunner.query(`DROP TYPE "public"."income_entity_category_enum"`);
    await queryRunner.query(`DROP TABLE "recurring_income_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."recurring_income_entity_category_enum"`,
    );
    await queryRunner.query(`DROP TABLE "expense_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."expense_entity_category_enum"`,
    );
    await queryRunner.query(`DROP TABLE "recurring_expense_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."recurring_expense_entity_category_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b998bada7cff93fcb953b0c37"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
