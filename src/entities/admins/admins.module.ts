import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from './admins.entity';
import { AdminsService } from './admins.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
    imports: [forwardRef(() => CompaniesModule), TypeOrmModule.forFeature([AdminsEntity])],
    providers: [AdminsService],
    exports: [AdminsService]

})
export class AdminsModule { }
