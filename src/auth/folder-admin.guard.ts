import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoldersEntity } from 'src/entities/folders/folders.entity';
import { AdminsService } from 'src/entities/admins/admins.service';

@Injectable()
export class FolderAdminGuard implements CanActivate {
    constructor(
        private readonly adminsService: AdminsService,
        @InjectRepository(FoldersEntity)
        private readonly folderRepo: Repository<FoldersEntity>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.user)
            throw new UnauthorizedException('Not authenticated');

        const admin = await this.adminsService.get_by_id(request.user.user_id);

        const id_folder = request.params?.id_folder ?? request.body?.id_folder;
        if (!id_folder)
            throw new NotFoundException('Folder ID not found in request');

        const folder = await this.folderRepo.findOneBy({ id_folder });
        if (!folder)
            throw new NotFoundException(`Folder with id ${id_folder} does not exist`);

        if (folder.id_company !== admin.id_company)
            throw new ForbiddenException('You do not have access to this folder\'s company');

        return true;
    }
}
