import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterNameTypeUsersTable1735320919787
  implements MigrationInterface
{
  name = 'AlterNameTypeUsersTable1735320919787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying`,
    );
  }
}
