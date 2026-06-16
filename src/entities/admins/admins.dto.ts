
import type { User, UserFilter } from 'src/user/user.dto'
import { AdminsEntity } from './admins.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface AdminDTO extends User {
    id_company: string;
}

export class AdminsCreateDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    company: string;
}

export class AdminMapper {
    static toDTO(admin: AdminsEntity): AdminDTO {
        return {
            id_user: admin.id_admin,
            id_company: admin.id_company,
            email: admin.email,
            password: admin.password
        }
    }

    static filter(admin: AdminDTO): UserFilter {
        return {
            id_user: admin.id_user,
            email: admin.email
        }
    }
}
