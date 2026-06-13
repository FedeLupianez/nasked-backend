import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { config } from 'dotenv';
import { resolve } from 'path';

const envFile = process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env';

config({ path: resolve(process.cwd(), envFile) })

console.log(process.env.DB_NAME)
export const dataSourceOptions: DataSourceOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migration/*.ts'],
    synchronize: false,
    logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
