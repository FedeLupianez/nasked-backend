import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { DatabaseService } from 'src/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersEntity } from './folders.entity';
import { Users_FoldersEntity } from '../users_folders.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminsModule } from 'src/entities/admins/admins.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoldersEntity, Users_FoldersEntity]),
        UserModule,
        AuthModule,
        AdminsModule
    ],
    providers: [FoldersService, DatabaseService],
    controllers: [FoldersController]
})
export class FoldersModule { }
