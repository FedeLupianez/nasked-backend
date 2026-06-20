import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FolderCreateDTO, FolderJoinDTO } from './folders.dto';
import { FoldersService } from './folders.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('folders')
export class FoldersController {
    constructor(
        private readonly folderService: FoldersService,
        private readonly authService: AuthService,
    ) { }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post('new')
    async create(@Body() body: FolderCreateDTO) {
        return await this.folderService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('join')
    async join(@Body() body: FolderJoinDTO) {
        return await this.folderService.join(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('joinlink')
    async join_link(@Query('token') folder_token: string, @Req() req) {
        const access_token = req['access_token_nasked'];
        const userEmail = this.authService.getEmail(access_token);
        return await this.folderService.join({ email: userEmail, token: folder_token })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/:id')
    async of_user(@Param('id') id_user: string) {
        return this.folderService.get_of_user(id_user);
    }
}
