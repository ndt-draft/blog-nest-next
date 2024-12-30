import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumnUsersTable1735579515845 implements MigrationInterface {
    name = 'AddRoleColumnUsersTable1735579515845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
