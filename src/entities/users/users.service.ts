import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { Repository } from "typeorm";
import { UsersMapper, UsersCreateDTO, type UsersDTO } from "./users.dto";
import { hash } from "argon2";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepo: Repository<UsersEntity>
    ) { }


    async get_by_id(userId: string): Promise<UsersDTO> {
        if (!userId)
            throw new BadRequestException('id is required');
        const user = await this.usersRepo.findOneBy({ id_user: userId });
        if (!user)
            throw new NotFoundException('Admin not found');
        return UsersMapper.toDTO(user);
    }

    async get_by_email(userEmail: string): Promise<UsersDTO> {
        if (!userEmail)
            throw new BadRequestException('id is required');
        const user = await this.usersRepo.findOneBy({ email: userEmail });
        if (!user)
            throw new NotFoundException('Admin not found');
        return UsersMapper.toDTO(user);
    }

    async create(user: UsersCreateDTO): Promise<UsersDTO> {
        const hashedPassword = await hash(user.password);
        const newUser = this.usersRepo.create({
            name: user.name,
            last_name: user.lastname,
            email: user.email,
            emp_id: user.emp_id,
            password: hashedPassword
        })

        const stored = await this.usersRepo.save(newUser);
        if (!stored)
            throw new InternalServerErrorException('Error saving user')
        return UsersMapper.toDTO(stored);
    }

}
