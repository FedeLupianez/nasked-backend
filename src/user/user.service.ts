import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/entities/admins/admins.entity';
import { UsersEntity } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';
import { User } from './user.dto';
import { AdminMapper } from 'src/entities/admins/admins.dto';
import { UsersMapper } from 'src/entities/users/users.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepo: Repository<UsersEntity>,
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
}
