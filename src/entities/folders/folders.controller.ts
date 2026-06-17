import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FolderCreateDTO, FolderJoinDTO } from './folders.dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
    constructor(
        private readonly folderService: FoldersService
    ) { }

    @Post('new')
    async create(@Body() body: FolderCreateDTO) {
        return await this.folderService.create(body);
    }

    @Post('join')
    async join(@Body() body: FolderJoinDTO) {
        return await this.folderService.join(body);
    }

    @Get('user/:id')
    async of_user(@Param('id') id_user: string) {
        return this.folderService.get_of_user(id_user);
    }
}
