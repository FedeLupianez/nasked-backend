import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
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

}
