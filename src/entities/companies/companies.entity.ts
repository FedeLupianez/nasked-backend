import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Companies')
export class CompaniesEntity {
    @PrimaryGeneratedColumn('uuid')
    id_company: string;

    @Column({ type: 'varchar', length: 50, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 255, name: 'logo' })
    logo: string;
}
