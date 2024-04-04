import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import DatabaseConfiguration, {dbConfig} from "./Configurations/Database.configuration";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [DatabaseConfiguration]}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.get(dbConfig)
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
