import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users/users.entity';
import { AdminsEntity } from 'src/entities/admins/admins.entity';
import { UsersModule } from 'src/entities/users/users.module';
import { CompaniesModule } from 'src/entities/companies/companies.module';
import { AdminsModule } from 'src/entities/admins/admins.module';
import { AdminGuard } from 'src/auth/admin.guard';

@Module({
    imports: [UsersModule, AdminsModule, CompaniesModule, TypeOrmModule.forFeature([UsersEntity, AdminsEntity])],
    providers: [UserService, AdminGuard],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }

