import { Module, forwardRef } from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from './companies.entity';
import { AdminsModule } from '../admins/admins.module';

@Module({
    imports: [forwardRef(() => AdminsModule), TypeOrmModule.forFeature([CompaniesEntity])],
    providers: [CompaniesService, AdminGuard],
    controllers: [CompaniesController],
    exports: [CompaniesService]

})
export class CompaniesModule { }
