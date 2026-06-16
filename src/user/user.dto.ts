import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface User {
    id_user: string;
    email: string;
    password: string;
}

export interface UserFilter {
    id_user: string;
    email: string;
    name?: string;
    lastname?: string;
    emp_id?: string;
    id_company?: string;
}

export class UserCreateDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsBoolean()
    is_admin: boolean;
    @IsString()
    name?: string;
    @IsString()
    lastname?: string;
    emp_id?: string;
    @IsString()
    company?: string;
}

