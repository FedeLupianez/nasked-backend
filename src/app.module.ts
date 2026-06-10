import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { UsersModule } from './entities/users/users.module';
import { CompaniesModule } from './entities/companies/companies.module';
import { AdminsModule } from './entities/admins/admins.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        UsersModule,
        CompaniesModule,
        AdminsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
