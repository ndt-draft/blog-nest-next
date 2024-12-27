import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTitleTypePostsTable1735319766081 implements MigrationInterface {
    name = 'AlterTitleTypePostsTable1735319766081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying NOT NULL`);
    }

}
