import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { DatabaseService } from 'src/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersEntity } from './folders.entity';
import { Users_FoldersEntity } from '../users_folders.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([FoldersEntity, Users_FoldersEntity])],
    providers: [FoldersService, DatabaseService],
    controllers: [FoldersController]
})
export class FoldersModule { }
