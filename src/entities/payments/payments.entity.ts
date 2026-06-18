import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillsEntity } from "../bills/bills.entity";

export enum PaymentProviders {
    STRIPE = 'STRIPE',
    MERCADO_PAGO = 'MERCADO_PAGO',
    PAYPAL = 'PAYPAL'
}

export enum PaymentStatus {
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

@Entity('Payments')
export class PaymentsEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_payment' })
    id_payment: string;

    @Column({ type: 'uuid', nullable: false, name: 'id_bill' })
    id_bill: string;

    @OneToOne(() => BillsEntity, { nullable: false })
    @JoinColumn({ name: 'id_bill', referencedColumnName: 'id_bill' })
    bill: BillsEntity;

    @Column({ type: 'enum', enum: PaymentProviders, nullable: false, name: 'provider' })
    provider !: PaymentProviders;

    @Column({ type: 'varchar', length: 255, name: 'provider_txn_id' })
    provider_txn_id: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, name: 'amount' })
    amount !: number;

    @Column({ type: 'char', length: 3, name: 'currency' })
    currency: string;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.SUCCEEDED, name: 'status' })
    status !: PaymentStatus;

}
