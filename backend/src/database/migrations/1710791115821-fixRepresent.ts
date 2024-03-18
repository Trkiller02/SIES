import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRepresent1710791115821 implements MigrationInterface {
    name = 'FixRepresent1710791115821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`represent\` DROP COLUMN \`relation\``);
        await queryRunner.query(`ALTER TABLE \`represent\` ADD \`relation\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`represent\` DROP COLUMN \`relation\``);
        await queryRunner.query(`ALTER TABLE \`represent\` ADD \`relation\` varchar(14) NOT NULL`);
    }

}
