import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlansEntity } from "../plans/plans.entity";

export enum CompaniesStatus {
    ACTIVE = 'ACTIVE',
    CANCELED = 'CANCELED',
    PAST_DUE = 'PAST_DUE',
    TRIALING = 'TRIALING'
}

@Entity('Companies')
export class CompaniesEntity {
    @PrimaryGeneratedColumn('uuid')
    id_company: string;

    @Column({ type: 'varchar', length: 50, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 255, name: 'logo' })
    logo: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    created_at: string;

    @Column({ type: 'uuid', nullable: false, name: 'id_plan' })
    id_plan: string;

    @OneToOne(() => PlansEntity, { nullable: false })
    @JoinColumn({ name: 'id_plan', referencedColumnName: 'id_plan' })
    plan: PlansEntity;

    @Column({ type: 'enum', enum: CompaniesStatus, default: CompaniesStatus.ACTIVE, name: 'status' })
    status !: CompaniesStatus;
}
