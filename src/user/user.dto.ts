import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface User {
    id_user: string;
    email: string;
    password: string;
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
    last_name?: string;
    emp_id?: string;
    @IsString()
    company?: string;
}

