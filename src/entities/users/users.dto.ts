
import { type User } from 'src/user/user.dto'
import { UsersEntity } from './users.entity';

export interface UserDTO extends User {
    emp_id: string;
    name: string;
    lastname: string;
}

export class UsersMapper {
    static toDTO(user: UsersEntity): UserDTO {
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




