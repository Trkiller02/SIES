import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusChange1710313058791 implements MigrationInterface {
    name = 'StatusChange1710313058791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'offline'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}
