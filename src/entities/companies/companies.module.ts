import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AdminGuard } from 'src/auth/admin.guard';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [UserModule],
  providers: [CompaniesService, AdminGuard],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
