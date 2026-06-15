import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AdminGuard } from 'src/auth/admin.guard';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from './companies.entity';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([CompaniesEntity])],
    providers: [CompaniesService, AdminGuard],
    controllers: [CompaniesController],
    exports: [CompaniesService]

})
export class CompaniesModule { }
