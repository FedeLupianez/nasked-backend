import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('UsersNasked')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
    id_user: string;

    @Column({ type: 'varchar', length: 50, name: 'emp_id', nullable: true })
    emp_id: string;

    @Column({ type: 'varchar', length: 50, name: 'name', nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, name: 'last_name', nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 50, name: 'email', nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, name: 'password' })
    password: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;
}
