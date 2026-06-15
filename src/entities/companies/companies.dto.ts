import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { CompaniesEntity } from "./companies.entity";

export class CompanyCreateDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    company: string;

    @IsUrl()
    logo: string;
}

export class CompanyDTO {
    id_company: string;
    @IsString()
    name: string;
    @IsUrl()
    logo: string;
}

export class UpdateLogoDTO {
    id_company: string;
    @IsUrl()
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
