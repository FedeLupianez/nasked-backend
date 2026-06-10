import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompaniesEntity } from "../companies/companies.entity";
import { AdminsEntity } from "../admins/admins.entity";

@Entity('Folders')
export class FoldersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_folder' })
    id_folder: string;

    @Column({ type: 'varchar', length: 6, name: 'access_token' })
    access_token: string;

    @Column({ type: 'uuid', name: 'id_company' })
    id_company: string;

    @ManyToOne(() => CompaniesEntity, { nullable: false })
    @JoinColumn({ name: 'id_company', referencedColumnName: 'id_company' })
    company: CompaniesEntity;

    @Column({ type: 'uuid', name: 'id_admin' })
    id_admin: string;

    @ManyToOne(() => AdminsEntity, { nullable: false })
    @JoinColumn({ name: 'id_admin', referencedColumnName: 'id_admin' })
    admin: AdminsEntity;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'uuid', name: 'belong_id' })
    belong_id: string;

    @ManyToOne(() => FoldersEntity, { nullable: false })
    @JoinColumn({ name: 'belong_id', referencedColumnName: 'id_folder' })
    belong: FoldersEntity;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;
}
