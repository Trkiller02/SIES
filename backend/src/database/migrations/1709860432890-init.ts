import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709860432890 implements MigrationInterface {
    name = 'Init1709860432890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`health_info\` (\`id\` varchar(36) NOT NULL, \`type_aler\` text NULL, \`live_with\` varchar(255) NOT NULL, \`trata_esp\` text NULL, \`prefer_act\` text NULL, \`recre_time\` text NULL, \`site_act\` text NULL, \`sex\` varchar(20) NOT NULL, \`weight\` float NULL, \`size\` float NULL, \`lateralidad\` varchar(20) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` varchar(36) NOT NULL, \`age\` int NOT NULL, \`born_place\` varchar(255) NOT NULL, \`born_state\` varchar(255) NOT NULL, \`born_municipio\` varchar(255) NOT NULL, \`born_parroquia\` varchar(255) NOT NULL, \`born_pais\` varchar(255) NOT NULL, \`born_date\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`person_id\` varchar(255) NULL, UNIQUE INDEX \`REL_f68e92722db1a5e99b341a8cf9\` (\`person_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`ci_number\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(100) NULL DEFAULT 'NO POSEE', \`phone_number\` varchar(100) NULL DEFAULT 'NO POSEE', \`home_dir\` text NOT NULL, \`home_parroquia\` text NOT NULL, \`home_municipio\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`ci_number\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`represent\` (\`id\` varchar(36) NOT NULL, \`profession\` varchar(30) NULL DEFAULT 'NO POSEE', \`tlfn_home\` varchar(14) NULL DEFAULT 'NO POSEE', \`work_place\` varchar(250) NULL DEFAULT 'NO POSEE', \`work_phone_number\` varchar(14) NULL DEFAULT 'NO POSEE', \`income_month\` int NULL DEFAULT '0', \`represent\` tinyint NULL DEFAULT 0, \`relation\` varchar(14) NOT NULL, \`deleted_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`person_id\` varchar(255) NULL, UNIQUE INDEX \`REL_b925870dfdca29888ca30441a2\` (\`person_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`relation_table\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` datetime(6) NULL, \`represent_id\` varchar(36) NULL, \`academic_data_id\` varchar(36) NULL, \`mother_id\` varchar(36) NULL, \`father_id\` varchar(36) NULL, \`health_info_id\` varchar(36) NULL, \`student_id\` varchar(36) NULL, UNIQUE INDEX \`REL_08c7ae6e7edce430419cb7b1ba\` (\`academic_data_id\`), UNIQUE INDEX \`REL_d87d2bf2f133883c23aa04b53c\` (\`health_info_id\`), UNIQUE INDEX \`REL_0d88c25143a7ca9a3e4df50288\` (\`student_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`academic_info\` (\`id\` varchar(36) NOT NULL, \`level\` int NOT NULL, \`section\` varchar(1) NOT NULL, \`etapa\` text NOT NULL, \`turno\` varchar(10) NOT NULL, \`escolar_period\` varchar(50) NOT NULL, \`proce_plant\` text NOT NULL, \`ins_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`egresado\` tinyint NOT NULL DEFAULT 0, \`person_res_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`restore_token\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`ci_number\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`role_id\` int NULL, UNIQUE INDEX \`IDX_124098bc34a8b0140c863f81dd\` (\`ci_number\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_f68e92722db1a5e99b341a8cf9b\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`ci_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`represent\` ADD CONSTRAINT \`FK_b925870dfdca29888ca30441a28\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`ci_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_04a1f2fb084dfdc69956f15be35\` FOREIGN KEY (\`represent_id\`) REFERENCES \`represent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_08c7ae6e7edce430419cb7b1ba0\` FOREIGN KEY (\`academic_data_id\`) REFERENCES \`academic_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_c82084cb923fdceff8f91e036ee\` FOREIGN KEY (\`mother_id\`) REFERENCES \`represent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_f753dde61383452d93b3e569991\` FOREIGN KEY (\`father_id\`) REFERENCES \`represent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_d87d2bf2f133883c23aa04b53c0\` FOREIGN KEY (\`health_info_id\`) REFERENCES \`health_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`relation_table\` ADD CONSTRAINT \`FK_0d88c25143a7ca9a3e4df502889\` FOREIGN KEY (\`student_id\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`academic_info\` ADD CONSTRAINT \`FK_d2c6c109e2eccc5e8284739bbd4\` FOREIGN KEY (\`person_res_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`ALTER TABLE \`academic_info\` DROP FOREIGN KEY \`FK_d2c6c109e2eccc5e8284739bbd4\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_0d88c25143a7ca9a3e4df502889\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_d87d2bf2f133883c23aa04b53c0\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_f753dde61383452d93b3e569991\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_c82084cb923fdceff8f91e036ee\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_08c7ae6e7edce430419cb7b1ba0\``);
        await queryRunner.query(`ALTER TABLE \`relation_table\` DROP FOREIGN KEY \`FK_04a1f2fb084dfdc69956f15be35\``);
        await queryRunner.query(`ALTER TABLE \`represent\` DROP FOREIGN KEY \`FK_b925870dfdca29888ca30441a28\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_f68e92722db1a5e99b341a8cf9b\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_124098bc34a8b0140c863f81dd\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`academic_info\``);
        await queryRunner.query(`DROP INDEX \`REL_0d88c25143a7ca9a3e4df50288\` ON \`relation_table\``);
        await queryRunner.query(`DROP INDEX \`REL_d87d2bf2f133883c23aa04b53c\` ON \`relation_table\``);
        await queryRunner.query(`DROP INDEX \`REL_08c7ae6e7edce430419cb7b1ba\` ON \`relation_table\``);
        await queryRunner.query(`DROP TABLE \`relation_table\``);
        await queryRunner.query(`DROP INDEX \`REL_b925870dfdca29888ca30441a2\` ON \`represent\``);
        await queryRunner.query(`DROP TABLE \`represent\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP INDEX \`REL_f68e92722db1a5e99b341a8cf9\` ON \`student\``);
        await queryRunner.query(`DROP TABLE \`student\``);
        await queryRunner.query(`DROP TABLE \`health_info\``);
    }

}
