import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompaniesEntity } from "../companies/companies.entity";
import { hash } from "argon2";


@Entity('AdminsNasked')
export class AdminsEntity {
    @PrimaryGeneratedColumn('uuid')
    id_admin: string;

    @Column({ type: 'uuid', name: 'id_company' })
    id_company: string;

    @ManyToOne(() => CompaniesEntity, { nullable: false })
    @JoinColumn({ name: 'id_company', referencedColumnName: 'id_company' })
    company: CompaniesEntity;

    @Column({ type: 'varchar', length: 50, name: 'email', nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password);
    }
}
