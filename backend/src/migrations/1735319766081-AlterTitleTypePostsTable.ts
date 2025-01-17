import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTitleTypePostsTable1735319766081
  implements MigrationInterface
{
  name = 'AlterTitleTypePostsTable1735319766081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "title" TYPE character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "title" TYPE character varying`,
    );
  }
}
