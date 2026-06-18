import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Plans')
export class PlansEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_plan' })
    id_plan: string;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false, name: 'description' })
    description: string;

    @Column({ type: 'int', name: 'employees' })
    employees: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, name: 'price' })
    price: number;
}
