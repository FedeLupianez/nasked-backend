import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { FoldersEntity } from "./folders.entity";

export interface FolderDTO {
    id_folder: string;
    access_token: string;
    id_company: string;
    id_admin: string;
    name: string;
    belong_id: string;
    created_at: Date;
}

export class FolderCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsString()
    belong_id: string;
    @IsNotEmpty()
    @IsString()
    id_company: string;
    @IsNotEmpty()
    @IsString()
    id_admin: string;
}

export class FolderJoinDTO {
    @IsString()
    id_user?: string;
    @IsEmail()
    email?: string;
    @IsNotEmpty()
    @IsString()
    token: string;
}

export class FolderMapper {
    static toDTO(folder: FoldersEntity): FolderDTO {
        return {
            id_folder: folder.id_folder,
            access_token: folder.access_token,
            id_company: folder.id_company,
            id_admin: folder.id_admin,
            belong_id: folder.belong_id,
            created_at: folder.created_at,
            name: folder.name
        }
    }
}

