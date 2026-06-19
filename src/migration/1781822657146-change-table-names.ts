import type { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTableNames1781822657146 implements MigrationInterface {
    name = 'ChangeTableNames1781822657146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UsersNasked\` (\`id_user\` uuid NOT NULL, \`emp_id\` varchar(50) NULL, \`name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Plans\` (\`id_plan\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, \`employees\` int NOT NULL, \`price\` decimal(8,2) NOT NULL, PRIMARY KEY (\`id_plan\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Companies\` (\`id_company\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`logo\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`id_plan\` uuid NOT NULL, \`status\` enum ('ACTIVE', 'CANCELED', 'PAST_DUE', 'TRIALING') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`REL_5d29a1d334e6ee86a7645a3a74\` (\`id_plan\`), PRIMARY KEY (\`id_company\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`AdminsNasked\` (\`id_admin\` uuid NOT NULL, \`id_company\` uuid NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id_admin\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Folders\` (\`id_folder\` uuid NOT NULL, \`access_token\` varchar(6) NOT NULL, \`id_company\` uuid NOT NULL, \`id_admin\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`belong_id\` uuid NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), PRIMARY KEY (\`id_folder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users_Folders\` (\`id_user\` uuid NOT NULL, \`id_folder\` uuid NOT NULL, PRIMARY KEY (\`id_user\`, \`id_folder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users_Companies\` (\`id_user\` uuid NOT NULL, \`id_company\` uuid NOT NULL, PRIMARY KEY (\`id_user\`, \`id_company\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RefreshTokens\` (\`id_token\` uuid NOT NULL, \`token_hash\` varchar(255) NOT NULL, \`expires_at\` timestamp NOT NULL, \`revoked_at\` timestamp NULL, \`ip_address\` inet4 NOT NULL, \`user_agent\` varchar(255) NOT NULL, PRIMARY KEY (\`id_token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BillsNasked\` (\`id_bill\` uuid NOT NULL, \`id_company\` uuid NOT NULL, \`status\` enum ('DRAFT', 'PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELED') NOT NULL DEFAULT 'PENDING', \`detail\` varchar(500) NULL, \`price\` decimal(8,2) NOT NULL, \`currency\` char(3) NOT NULL, \`discount\` decimal(3,1) NOT NULL, \`issue_date\` timestamp NOT NULL, \`next_billing\` timestamp NOT NULL, \`period_start\` timestamp NOT NULL, \`period_end\` timestamp NOT NULL, \`invoice_num\` char(6) NOT NULL COMMENT 'código legible de la cuenta', PRIMARY KEY (\`id_bill\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Payments\` (\`id_payment\` uuid NOT NULL, \`id_bill\` uuid NOT NULL, \`provider\` enum ('STRIPE', 'MERCADO_PAGO', 'PAYPAL') NOT NULL, \`provider_txn_id\` varchar(255) NOT NULL, \`amount\` decimal(8,2) NOT NULL, \`currency\` char(3) NOT NULL, \`status\` enum ('SUCCEEDED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'SUCCEEDED', UNIQUE INDEX \`REL_02d5b03bd2a6f49c146d1ddd55\` (\`id_bill\`), PRIMARY KEY (\`id_payment\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Companies\` ADD CONSTRAINT \`FK_5d29a1d334e6ee86a7645a3a740\` FOREIGN KEY (\`id_plan\`) REFERENCES \`Plans\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`AdminsNasked\` ADD CONSTRAINT \`FK_f0eef355d281d94f78c9b3f894c\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_2c35f32cf09413dec13a1a8eb5b\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_d59f300a4bad1f22686c486197d\` FOREIGN KEY (\`id_admin\`) REFERENCES \`AdminsNasked\`(\`id_admin\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Folders\` ADD CONSTRAINT \`FK_2f76009b71dbfd8bd3bb60a72b5\` FOREIGN KEY (\`belong_id\`) REFERENCES \`Folders\`(\`id_folder\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` ADD CONSTRAINT \`FK_8cece4e24d333d0338dbba18259\` FOREIGN KEY (\`id_user\`) REFERENCES \`UsersNasked\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` ADD CONSTRAINT \`FK_48224a4db86d27da58d41dd3844\` FOREIGN KEY (\`id_folder\`) REFERENCES \`Folders\`(\`id_folder\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` ADD CONSTRAINT \`FK_e01d2ad4063c77f1fcb6cfc3d63\` FOREIGN KEY (\`id_user\`) REFERENCES \`UsersNasked\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` ADD CONSTRAINT \`FK_4654f15faf7afe250eca73c1705\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BillsNasked\` ADD CONSTRAINT \`FK_7c8846afb459b64e72f9b4709d7\` FOREIGN KEY (\`id_company\`) REFERENCES \`Companies\`(\`id_company\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Payments\` ADD CONSTRAINT \`FK_02d5b03bd2a6f49c146d1ddd551\` FOREIGN KEY (\`id_bill\`) REFERENCES \`BillsNasked\`(\`id_bill\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Payments\` DROP FOREIGN KEY \`FK_02d5b03bd2a6f49c146d1ddd551\``);
        await queryRunner.query(`ALTER TABLE \`BillsNasked\` DROP FOREIGN KEY \`FK_7c8846afb459b64e72f9b4709d7\``);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` DROP FOREIGN KEY \`FK_4654f15faf7afe250eca73c1705\``);
        await queryRunner.query(`ALTER TABLE \`Users_Companies\` DROP FOREIGN KEY \`FK_e01d2ad4063c77f1fcb6cfc3d63\``);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` DROP FOREIGN KEY \`FK_48224a4db86d27da58d41dd3844\``);
        await queryRunner.query(`ALTER TABLE \`Users_Folders\` DROP FOREIGN KEY \`FK_8cece4e24d333d0338dbba18259\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_2f76009b71dbfd8bd3bb60a72b5\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_d59f300a4bad1f22686c486197d\``);
        await queryRunner.query(`ALTER TABLE \`Folders\` DROP FOREIGN KEY \`FK_2c35f32cf09413dec13a1a8eb5b\``);
        await queryRunner.query(`ALTER TABLE \`AdminsNasked\` DROP FOREIGN KEY \`FK_f0eef355d281d94f78c9b3f894c\``);
        await queryRunner.query(`ALTER TABLE \`Companies\` DROP FOREIGN KEY \`FK_5d29a1d334e6ee86a7645a3a740\``);
        await queryRunner.query(`DROP INDEX \`REL_02d5b03bd2a6f49c146d1ddd55\` ON \`Payments\``);
        await queryRunner.query(`DROP TABLE \`Payments\``);
        await queryRunner.query(`DROP TABLE \`BillsNasked\``);
        await queryRunner.query(`DROP TABLE \`RefreshTokens\``);
        await queryRunner.query(`DROP TABLE \`Users_Companies\``);
        await queryRunner.query(`DROP TABLE \`Users_Folders\``);
        await queryRunner.query(`DROP TABLE \`Folders\``);
        await queryRunner.query(`DROP TABLE \`AdminsNasked\``);
        await queryRunner.query(`DROP INDEX \`REL_5d29a1d334e6ee86a7645a3a74\` ON \`Companies\``);
        await queryRunner.query(`DROP TABLE \`Companies\``);
        await queryRunner.query(`DROP TABLE \`Plans\``);
        await queryRunner.query(`DROP TABLE \`UsersNasked\``);
    }

}
