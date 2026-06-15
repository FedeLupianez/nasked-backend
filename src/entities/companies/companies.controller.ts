import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';
import { CompanyCreateDTO, UpdateLogoDTO, type UpdateNameDTO } from './companies.dto';
import { CompaniesService } from './companies.service';

@Controller('company')
export class CompaniesController {
    constructor(private readonly companyService: CompaniesService) { }

    @Post('create')
    async create(@Body() body: CompanyCreateDTO) {
        return this.companyService.create(body);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch('update_logo')
    async updateLogo(@Body() body: UpdateLogoDTO) {
        return this.companyService.update_logo(body.id_company, body.logo);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch('update_name')
    async updateName(@Body() body: UpdateNameDTO) {
        return this.companyService.update_name(body.id_company, body.name);
    }
}
