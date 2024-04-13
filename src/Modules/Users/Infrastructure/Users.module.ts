import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../Domain/Entities/User.entity";
import {UsersDataEntity} from "../Domain/Entities/UsersData.entity";
import {UsersRepositoryAdapter} from "./UsersRepository.adapter";
import {SignUpCommandHandler} from "../Application/SignUp/SignUpCommand.handler";
import {SignUpController} from "../Application/SignUp/SignUp.controller";
import {CqrsModule} from "@nestjs/cqrs";
import {UsersRepositoryKey} from "../Domain/IUsersRepository.port";
import {ChangePasswordController} from "../Application/ChangePassword/ChangePassword.controller";
import {ChangePasswordCommandHandler} from "../Application/ChangePassword/ChangePasswordCommand.handler";
import {SignInCommandHandler} from "../Application/SignIn/SignInCommand.handler";
import {SignInController} from "../Application/SignIn/SignIn.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UsersDataEntity]), CqrsModule],
    providers: [
        {provide: UsersRepositoryKey, useClass: UsersRepositoryAdapter},
        SignUpCommandHandler,
        ChangePasswordCommandHandler,
        SignInCommandHandler
    ],
    controllers: [SignUpController, ChangePasswordController, SignInController]
})
export class UsersModule {}
