import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { config } from 'dotenv';
import { resolve } from 'path';

const envFile = process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env';

config({ path: resolve(__dirname, envFile) })


export const dataSourceOptions: DataSourceOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
    logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
