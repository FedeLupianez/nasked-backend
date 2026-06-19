import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersModule } from 'src/entities/users/users.module';
import { AdminsModule } from 'src/entities/admins/admins.module';

@Module({
    imports: [UsersModule, AdminsModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }

