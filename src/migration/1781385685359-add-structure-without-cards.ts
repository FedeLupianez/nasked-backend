import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStructureWithoutCards1781385685359 implements MigrationInterface {
    name = 'AddStructureWithoutCards1781385685359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`RefreshTokens\` (\`id_token\` uuid NOT NULL, \`token_hash\` varchar(255) NOT NULL, \`expires_at\` timestamp NOT NULL, \`revoked_at\` timestamp NULL, \`ip_address\` inet4 NOT NULL, \`user_agent\` varchar(255) NOT NULL, PRIMARY KEY (\`id_token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UsersNasked\` (\`id_user\` uuid NOT NULL, \`emp_id\` varchar(50) NULL, \`name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Companies\` (\`id_company\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`logo\` varchar(255) NOT NULL, PRIMARY KEY (\`id_company\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users_Companies\` (\`id_user\` uuid NOT NULL, \`id_company\` uuid NOT NULL, PRIMARY KEY (\`id_user\`, \`id_company\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Admins\` (\`id_admin\` uuid NOT NULL, \`id_company\` uuid NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id_admin\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Folders\` (\`id_folder\` uuid NOT NULL, \`access_token\` varchar(6) NOT NULL, \`id_company\` uuid NOT NULL, \`id_admin\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`belong_id\` uuid NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), PRIMARY KEY (\`id_folder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users_Folders\` (\`id_user\` uuid NOT NULL, \`id_folder\` uuid NOT NULL, PRIMARY KEY (\`id_user\`, \`id_folder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` ADD CONSTRAINT \`FK_e01d2ad4063c77f1fcb6cfc3d63\` FOREIGN KEY (\`id_user\`) REFERENCES \`UsersNasked\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` ADD CONSTRAINT \`FK_4654f15faf7afe250eca73c1705\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Admins\` ADD CONSTRAINT \`FK_a47b69693622951ae3fdf0eb571\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_2c35f32cf09413dec13a1a8eb5b\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_d59f300a4bad1f22686c486197d\` FOREIGN KEY (\`id_admin\`) REFERENCES \`Admins\`(\`id_admin\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_2f76009b71dbfd8bd3bb60a72b5\` FOREIGN KEY (\`belong_id\`) REFERENCES \`Folders\`(\`id_folder\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` ADD CONSTRAINT \`FK_8cece4e24d333d0338dbba18259\` FOREIGN KEY (\`id_user\`) REFERENCES \`UsersNasked\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` ADD CONSTRAINT \`FK_48224a4db86d27da58d41dd3844\` FOREIGN KEY (\`id_folder\`) REFERENCES \`Folders\`(\`id_folder\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` DROP FOREIGN KEY \`FK_48224a4db86d27da58d41dd3844\``);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` DROP FOREIGN KEY \`FK_8cece4e24d333d0338dbba18259\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_2f76009b71dbfd8bd3bb60a72b5\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_d59f300a4bad1f22686c486197d\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_2c35f32cf09413dec13a1a8eb5b\``);
        await queryRunner.query(`ALTER TABLE \`Admins\` DROP FOREIGN KEY \`FK_a47b69693622951ae3fdf0eb571\``);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` DROP FOREIGN KEY \`FK_4654f15faf7afe250eca73c1705\``);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` DROP FOREIGN KEY \`FK_e01d2ad4063c77f1fcb6cfc3d63\``);
        await queryRunner.query(`DROP TABLE \`Users_Folders\``);
        await queryRunner.query(`DROP TABLE \`Folders\``);
        await queryRunner.query(`DROP TABLE \`Admins\``);
        await queryRunner.query(`DROP TABLE \`Users_Companies\``);
        await queryRunner.query(`DROP TABLE \`Companies\``);
        await queryRunner.query(`DROP TABLE \`UsersNasked\``);
        await queryRunner.query(`DROP TABLE \`RefreshTokens\``);
    }

}
