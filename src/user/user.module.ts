import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersModule } from 'src/entities/users/users.module';
import { AdminsModule } from 'src/entities/admins/admins.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [UsersModule, AdminsModule],
    providers: [UserService, DatabaseService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }

