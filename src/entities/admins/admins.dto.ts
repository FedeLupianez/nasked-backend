
import type { User } from 'src/user/user.dto'
import { AdminsEntity } from './admins.entity';

export interface AdminDTO extends User {
    id_company: string;
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
}
