
import { type User } from 'src/user/user.dto'
import { UsersEntity } from './users.entity';

export interface UsersDTO extends User {
    emp_id: string;
    name: string;
    lastname: string;
}

export interface UsersCreateDTO {
    email: string;
    password: string;
    name: string;
    lastname: string;
    emp_id: string;
}

export class UsersMapper {
    static toDTO(user: UsersEntity): UsersDTO {
        return {
            id_user: user.id_user,
            emp_id: user.emp_id,
            email: user.email,
            password: user.password,
            name: user.name,
            lastname: user.last_name
        }
    }
}




