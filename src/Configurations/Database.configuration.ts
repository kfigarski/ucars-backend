import {registerAs} from "@nestjs/config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const dbConfig = "configuration:database";
export default registerAs<TypeOrmModuleOptions>(
    dbConfig,
    (): TypeOrmModuleOptions => ({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "postgres",
        schema: "public",
        synchronize: false,
        retryAttempts: 5,
        retryDelay: 5000,
        autoLoadEntities: true
    })
);
