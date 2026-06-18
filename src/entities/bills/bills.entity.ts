import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompaniesEntity } from "../companies/companies.entity";

export enum BillStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
    CANCELED = 'CANCELED'
}

@Entity('Bills')
export class BillsEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_bill' })
    id_bill: string;

    @Column({ type: 'uuid', nullable: false })
    id_company!: string;

    @ManyToOne(() => CompaniesEntity, { nullable: false })
    @JoinColumn({ name: 'id_company', referencedColumnName: 'id_company' })
    company: CompaniesEntity;

    @Column({ type: 'enum', enum: BillStatus, default: BillStatus.PENDING, name: 'detail' })
    status !: BillStatus;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'detail' })
    detail: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, name: 'price' })
    price: number;

    @Column({ type: 'char', length: 3, name: 'currency' })
    currency: string;

    @Column({ type: 'decimal', precision: 3, scale: 1, name: 'discount' })
    discount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'issue_date' })
    issue_date: string;

    @Column({ type: 'timestamp', name: 'next_billing' })
    next_billing: string;

    @Column({ type: 'timestamp', name: 'period_start' })
    period_start: string;

    @Column({ type: 'timestamp', name: 'period_end' })
    period_end: string;

    @Column({ type: 'char', length: 6, name: 'invoice_num', comment: 'código legible de la cuenta' })
    invoice_num: string;
}
