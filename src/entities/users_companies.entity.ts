import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users/users.entity";
import { CompaniesEntity } from "./companies/companies.entity";

@Entity('Users_Companies')
export class Users_CompaniesEntity {
    @PrimaryColumn({ type: 'uuid', name: 'id_user' })
    id_user: string;

    @ManyToOne(() => UsersEntity, { nullable: false })
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id_user' })
    user: UsersEntity;

    @PrimaryColumn({ type: 'uuid', name: 'id_company' })
    id_company: string;

    @ManyToOne(() => CompaniesEntity, { nullable: false })
    @JoinColumn({ name: 'id_company', referencedColumnName: 'id_company' })
    company: CompaniesEntity;
}
