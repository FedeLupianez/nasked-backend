import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('RefreshTokens')
export class TokensEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_token' })
    id_token: string;

    @Column({ type: 'varchar', length: 255, name: 'token_hash', nullable: false })
    token_hash: string;

    @Column({ type: 'timestamp', name: 'expires_at' })
    expires_at: string;


    @Column({ type: 'timestamp', name: 'revoked_at' })
    revoked_at: string;

    @Column({ type: 'inet4', name: 'ip_address' })
    ip_address: string;


    @Column({ type: 'varchar', length: 255, name: 'user_agent', nullable: false })
    user_agent: string;
}
