import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { User, UserCreateDTO } from './user.dto';
import { UsersService } from 'src/entities/users/users.service';
import { AdminsService } from 'src/entities/admins/admins.service';

@Injectable()
export class UserService {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService,
    ) { }

    async get_by_email(email: string): Promise<User> {
        if (!email)
            throw new BadRequestException('Email is empty');
        const admin = await this.adminsService.get_by_email(email);
        if (admin) {
            return admin;
        }
        const user = await this.usersService.get_by_email(email);
        if (user)
            throw new NotFoundException(`User with email ${email} not found`);
        return user;
    }

    async get_by_id(userId: string): Promise<User> {
        if (!userId)
            throw new BadRequestException('Id is empty');
        const admin = await this.adminsService.get_by_id(userId);
        if (admin)
            return admin;
        const user = await this.usersService.get_by_id(userId);
        if (!user)
            throw new NotFoundException(`User with id ${userId} not found`);
        return user;
    }

    async create(user: UserCreateDTO) {
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
            lastname: user.last_name!
        })
    }
}
