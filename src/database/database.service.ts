import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/user/user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(@InjectDataSource() private readonly datasource: DataSource) { }

    async get_new_token(): Promise<string> {
        const result = await this.datasource.query('SELECT get_new_token()');
        const new_token: string = result?.[0]?.get_new_token;
        if (!new_token)
            throw new InternalServerErrorException('Can not generate new access_token');
        return new_token;
    }

    async get_new_invoice(): Promise<string> {
        const result = await this.datasource.query('SELECT get_new_invoice_num()');
        const newNum: string = result?.[0]?.get_new_invoice_num;
        if (!newNum)
            throw new InternalServerErrorException('Error generating invoice number');
        return newNum;
    }

    async get_user_by_email(email: string): Promise<User> {
        const result = await this.datasource.query(`
            SELECT
                u.id_user,
                u.email,
                u.password
            FROM UsersNasked u
            WHERE a.email = ?

            UNION ALL

            SELECT
                a.id_admin as id_user,
                a.email,
                a.password
            FROM AdminsNasked a
            WHERE a.email = ?

        `, [email, email]);
        if (result.length === 0)
            throw new NotFoundException('User Not found');
        return result[0];
    }

    async get_user_by_id(id_user: string): Promise<User> {
        const result = await this.datasource.query(`
            SELECT
                u.id_user,
                u.email,
                u.password
            FROM UsersNasked u
            WHERE a.id_user = ?

            UNION ALL

            SELECT
                a.id_admin as id_user,
                a.email,
                a.password
            FROM AdminsNasked a
            WHERE a.id_admin = ?

        `, [id_user, id_user]);
        if (result.length === 0)
            throw new NotFoundException('User Not found');
        return result[0];
    }

}
