import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type User, UserCreateDTO, UserGetDTO } from './user.dto';
import { UsersService } from 'src/entities/users/users.service';
import { AdminsService } from 'src/entities/admins/admins.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService,
        private readonly dbService: DatabaseService
    ) { }

    async get_user(data: UserGetDTO): Promise<User> {
        if (!data.email && !data.id_user)
            throw new BadRequestException('Data is empty');
        if (!data.email && data.id_user)
            return this.dbService.get_user_by_id(data.id_user);
        if (!data.id_user && data.email)
            return this.dbService.get_user_by_id(data.email);
        throw new BadRequestException('Invalid Data');
    }

    async create(user: UserCreateDTO): Promise<User> {
        if (user.is_admin) {
            return this.adminsService.create({
                email: user.email,
                password: user.password,
                company: user.company!
            })
        }
        return this.usersService.create({
            email: user.email,
            password: user.password,
            emp_id: user.emp_id!,
            name: user.name!,
            lastname: user.lastname!
        })
    }
}
