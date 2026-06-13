import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users/users.entity";
import { FoldersEntity } from "./folders/folders.entity";

@Entity('Users_Folders')
export class Users_FoldersEntity {
    @PrimaryColumn({ type: 'uuid', name: 'id_user' })
    id_user: string;

    @ManyToOne(() => UsersEntity, { nullable: false })
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id_user' })
    user: UsersEntity;

    @PrimaryColumn({ type: 'uuid', name: 'id_folder' })
    id_folder: string;

    @ManyToOne(() => FoldersEntity, { nullable: false })
    @JoinColumn({ name: 'id_folder', referencedColumnName: 'id_folder' })
    folder: FoldersEntity;
}
