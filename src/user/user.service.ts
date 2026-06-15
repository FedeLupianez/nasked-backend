import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/entities/admins/admins.entity';
import { UsersEntity } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';
import type { User, UserCreateDTO } from './user.dto';
import { AdminMapper } from 'src/entities/admins/admins.dto';
import { UsersMapper } from 'src/entities/users/users.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepo: Repository<UsersEntity>,
        @InjectRepository(AdminsEntity) private readonly adminsRepo: Repository<AdminsEntity>,
    ) { }

    async get_by_email(email: string): Promise<User> {
        if (!email)
            throw new BadRequestException('Email is empty');

        const admin = await this.adminsRepo.findOneBy({ email: email });
        if (admin) {
            return AdminMapper.toDTO(admin);
        }
        const user = await this.usersRepo.findOneBy({ email: email });
        if (!user)
            throw new NotFoundException(`User with email ${email} not found`);
        return UsersMapper.toDTO(user);
    }

    async get_by_id(userId: string): Promise<User> {
        if (!userId)
            throw new BadRequestException('Id is empty');
        const admin = await this.adminsRepo.findOneBy({ id_admin: userId });
        if (admin)
            return AdminMapper.toDTO(admin);
        const user = await this.usersRepo.findOneBy({ id_user: userId });
        if (!user)
            throw new NotFoundException(`User with id ${userId} not found`);
        return UsersMapper.toDTO(user);
    }

    async get_admin(userId: string): Promise<User> {
        if (!userId)
            throw new BadRequestException('Id is empty');
        const admin = await this.adminsRepo.findOneBy({ id_admin: userId });
        if (!admin)
            throw new UnauthorizedException('user is not admin')
        return AdminMapper.toDTO(admin);
    }

    async create(user: UserCreateDTO): Promise<User> {
        const hashedPassword = await hash(user.password);

        if (user.is_admin) {
            if (!user.id_company)
                throw new BadRequestException('id_company is required for admin users');

            const admin = this.adminsRepo.create({
                email: user.email,
                password: hashedPassword,
                id_company: user.id_company,
            });
            const saved = await this.adminsRepo.save(admin);
            return AdminMapper.toDTO(saved);
        }

        if (!user.name || !user.last_name)
            throw new BadRequestException('name and last_name are required for regular users');

        const newUser = this.usersRepo.create({
            email: user.email,
            password: hashedPassword,
            name: user.name,
            last_name: user.last_name,
            emp_id: user.emp_id,
        });
        const saved = await this.usersRepo.save(newUser);
        return UsersMapper.toDTO(saved);
    }
}
