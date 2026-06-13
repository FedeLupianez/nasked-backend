import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users/users.entity';
import { AdminsEntity } from 'src/entities/admins/admins.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity, AdminsEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }

