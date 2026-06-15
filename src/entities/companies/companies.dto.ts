import { CompaniesEntity } from "./companies.entity";

export interface CompanyCreateDTO {
    name: string;
    logo: string;
}

export interface CompanyDTO {
    id_company: string;
    name: string;
    logo: string;
}

export interface UpdateLogoDTO {
    id_company: string;
    logo: string;
}

export interface UpdateNameDTO {
    id_company: string;
    name: string;
}

export class CompanyMapper {
    static toDTO(company: CompaniesEntity): CompanyDTO {
        return {
            id_company: company.id_company,
            name: company.name,
            logo: company.logo
        }
    }
}
