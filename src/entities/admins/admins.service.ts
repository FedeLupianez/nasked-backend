import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminsEntity } from "./admins.entity";
import { Repository } from "typeorm";
import { AdminMapper, type AdminDTO, AdminsCreateDTO } from "./admins.dto";
import { CompaniesService } from "../companies/companies.service";

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(AdminsEntity) private readonly adminsRepo: Repository<AdminsEntity>,
        @Inject(forwardRef(() => CompaniesService)) private readonly companyService: CompaniesService
    ) { }

    async get_by_id(adminId: string): Promise<AdminDTO> {
        if (!adminId)
            throw new BadRequestException('id is required');
        const admin = await this.adminsRepo.findOneBy({ id_admin: adminId });
        if (!admin)
            throw new NotFoundException('Admin not found');
        return AdminMapper.toDTO(admin);
    }

    async get_by_email(adminEmail: string): Promise<AdminDTO> {
        if (!adminEmail)
            throw new BadRequestException('email is required');
        const admin = await this.adminsRepo.findOneBy({ email: adminEmail });
        if (!admin)
            throw new NotFoundException(`Admin with email ${adminEmail} not found`);
        return AdminMapper.toDTO(admin);
    }

    async create(admin: AdminsCreateDTO): Promise<AdminDTO> {
        const company_name = admin.company.toLowerCase();
        const company = await this.companyService.get_by_name(company_name);
        const newAdmin = this.adminsRepo.create({
            email: admin.email,
            password: admin.password,
            id_company: company.id_company
        })
        const stored = await this.adminsRepo.save(newAdmin);
        if (!stored)
            throw new InternalServerErrorException('Error creating admin');
        return AdminMapper.toDTO(stored);
    }
}
