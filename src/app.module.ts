import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { CompaniesModule } from './entities/companies/companies.module';
import { FoldersModule } from './entities/folders/folders.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './entities/users/users.module';
import { AdminsModule } from './entities/admins/admins.module';
import { DatabaseService } from './database/database.service';
import { BillsModule } from './entities/bills/bills.module';
import { PlansModule } from './entities/plans/plans.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        CompaniesModule,
        FoldersModule,
        UserModule,
        AuthModule,
        UsersModule,
        AdminsModule,
        BillsModule,
        PlansModule
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
})
export class AppModule { }
