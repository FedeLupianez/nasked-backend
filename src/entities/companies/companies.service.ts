import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { type CompanyCreateDTO, type CompanyDTO, CompanyMapper } from './companies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesEntity } from './companies.entity';
import { Repository } from 'typeorm';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompaniesEntity) private readonly companiesRepo: Repository<CompaniesEntity>,
        private readonly adminsService: AdminsService
    ) { }

    async get_by_id(id_company: string): Promise<CompaniesEntity> {
        if (!id_company)
            throw new BadRequestException('id is empty');
        const company = await this.companiesRepo.findOneBy({ id_company: id_company });
        if (!company) {
            throw new NotFoundException(`Company with id ${id_company} not exists`);
        }
        return company;
    }

    async get_by_name(company_name: string): Promise<CompanyDTO> {
        if (!company_name)
            throw new BadRequestException('company name is required');
        const name = company_name.toLowerCase();
        const company = await this.companiesRepo.findOneBy({ name: name });
        if (!company) {
            throw new NotFoundException(`Company with name ${company_name} not exists`);
        }
        return CompanyMapper.toDTO(company);
    }

    async create(company_data: CompanyCreateDTO): Promise<CompanyDTO> {
        if (!company_data.company || !company_data.logo) {
            throw new BadRequestException('Invalid data');
        }
        const newCompany = this.companiesRepo.create({
            name: company_data.company.toLowerCase(),
            logo: company_data.logo
        });
        const newAdmin = this.adminsService.create({
            email: company_data.email,
            password: company_data.password,
            company: company_data.company.toLowerCase()
        })
        if (!newAdmin)
            throw new InternalServerErrorException('Admin was not created');
        this.companiesRepo.save(newCompany);
        return CompanyMapper.toDTO(newCompany);
    }

    async delete(id_company: string): Promise<boolean> {
        if (!id_company)
            throw new BadRequestException('id company is empty');
        const company = await this.get_by_id(id_company);
        this.companiesRepo.delete(company);
        return true;
    }

    async update_logo(id_company: string, new_logo_url: string): Promise<boolean> {
        if (!id_company || !new_logo_url)
            throw new BadRequestException('Data is empty');
        const company = await this.get_by_id(id_company);
        company.logo = new_logo_url;
        this.companiesRepo.save(company);
        return true;
    }


    async update_name(id_company: string, new_name: string): Promise<boolean> {
        if (!id_company || !new_name)
            throw new BadRequestException('Data is empty');
        const company = await this.get_by_id(id_company);
        company.name = new_name;
        this.companiesRepo.save(company);
        return true;
    }
}
