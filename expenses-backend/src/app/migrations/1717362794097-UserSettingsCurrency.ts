import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSettingsCurrency1717362794097 implements MigrationInterface {
  name = 'UserSettingsCurrency1717362794097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "settings" jsonb NOT NULL DEFAULT '{"currency":"EUR"}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "settings"`);
  }
}
