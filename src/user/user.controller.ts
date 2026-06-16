import { Body, Controller, Post } from '@nestjs/common';
import { AdminMapper, AdminsCreateDTO } from 'src/entities/admins/admins.dto';
import { AdminsService } from 'src/entities/admins/admins.service';
import { UsersCreateDTO, UsersMapper } from 'src/entities/users/users.dto';
import { UsersService } from 'src/entities/users/users.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService,
        private readonly adminsService: AdminsService) { }

    @Post('admin')
    async new_admin(@Body() body: AdminsCreateDTO) {
        const admin = await this.adminsService.create(body);
        return AdminMapper.filter(admin);
    }

    @Post('user')
    async new_user(@Body() body: UsersCreateDTO) {
        const user = await this.usersService.create(body);
        return UsersMapper.filter(user);
    }

}
