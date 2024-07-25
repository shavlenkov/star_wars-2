import { DataSource } from 'typeorm'
import {config} from "dotenv";

config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database:  process.env.MYSQL_DB,
    entities: ['./dist/**/*.entity.js'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrations: ['./dist/**/database/migrations/*.js'],
    migrationsTableName: 'history'
})