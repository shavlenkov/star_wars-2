import {config} from "dotenv";

config()

export default {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database:  process.env.MYSQL_DB,
    entities: ['src/**/entities/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    logger: 'file',
    seeds: ['src/database/seeders/*.ts']
}