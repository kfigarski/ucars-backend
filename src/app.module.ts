import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import DatabaseConfiguration, {dbConfig} from "./Configurations/Database.configuration";
import {UsersModule} from "./Modules/Users/Infrastructure/Users.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [DatabaseConfiguration]}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.get(dbConfig)
        }),
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
