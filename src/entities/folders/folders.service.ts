import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoldersEntity } from './folders.entity';
import { In, Repository } from 'typeorm';
import { FolderCreateDTO, FolderDTO, FolderJoinDTO, FolderMapper } from './folders.dto';
import { DatabaseService } from 'src/database/database.service';
import { Users_FoldersEntity } from '../users_folders.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FoldersService {
    constructor(
        @InjectRepository(FoldersEntity) private readonly folderRepo: Repository<FoldersEntity>,
        @InjectRepository(Users_FoldersEntity) private readonly users_folders: Repository<Users_FoldersEntity>,
        private readonly dbService: DatabaseService,
        private readonly userService: UserService
    ) { }

    async create(folder: FolderCreateDTO): Promise<FolderDTO> {
        const token = await this.dbService.get_new_token();
        const new_folder = this.folderRepo.create({
            id_admin: folder.id_admin,
            belong_id: folder.belong_id,
            id_company: folder.id_company,
            name: folder.name,
            access_token: token
        })
        const stored = await this.folderRepo.save(new_folder);
        if (!stored)
            throw new InternalServerErrorException('Error saving folder');
        return FolderMapper.toDTO(stored);
    }

    async delete(id_folder: string): Promise<boolean> {
        const result = await this.folderRepo.delete({
            id_folder: id_folder
        });
        if (!result.affected)
            throw new BadRequestException(`Folder with id ${id_folder} does not exists`);
        return true;
    }

    async join(data: FolderJoinDTO): Promise<boolean> {
        const folder = await this.folderRepo.findOneBy({ access_token: data.token });
        if (!folder)
            throw new BadRequestException(`Access token ${data.token} does not exists`);
        const user = await this.userService.get_by_id(data.id_user);
        if (!user)
            throw new BadRequestException(`User with id ${data.id_user} does not exists`);
        const relation = this.users_folders.create({
            id_user: user.id_user,
            id_folder: folder.id_folder
        })
        const stored = await this.users_folders.save(relation);
        if (!stored)
            throw new InternalServerErrorException('The relation was not created');
        return true;
    }

    async get_of_user(id_user: string): Promise<FolderDTO[]> {
        const user = await this.userService.get_by_id(id_user);
        const folder_ids = await this.users_folders.findBy({
            id_user: user.id_user
        });
        const folders = await this.folderRepo.find({
            where: {
                id_folder: In(folder_ids)
            }
        })
        const mapped: FolderDTO[] = folders.map((folder) => FolderMapper.toDTO(folder))
        return mapped;
    }
}
