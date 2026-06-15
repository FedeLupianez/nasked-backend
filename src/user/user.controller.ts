import { Body, Controller, Post } from '@nestjs/common';
import { type AdminsCreateDTO } from 'src/entities/admins/admins.dto';
import { AdminsService } from 'src/entities/admins/admins.service';
import { type UsersCreateDTO } from 'src/entities/users/users.dto';
import { UsersService } from 'src/entities/users/users.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService,
        private readonly adminsService: AdminsService) { }

    @Post('admin')
    async new_admin(@Body() body: AdminsCreateDTO) {
        return this.adminsService.create(body);
    }

    @Post('user')
    async new_user(@Body() body: UsersCreateDTO) {
        return this.usersService.create(body);
    }

}
