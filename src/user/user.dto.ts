export interface User {
    id_user: string;
    email: string;
    password: string;
}

export interface UserCreateDTO {
    email: string;
    password: string;
    is_admin: boolean;
    name?: string;
    last_name?: string;
    emp_id?: string;
    company?: string;
}

