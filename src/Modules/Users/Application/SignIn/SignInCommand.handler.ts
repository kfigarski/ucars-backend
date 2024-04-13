import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignInCommand} from "./SignIn.command";
import * as jwt from "jsonwebtoken";
import {BadRequestException, Inject} from "@nestjs/common";
import {IUsersRepositoryPort, UsersRepositoryKey} from "../../Domain/IUsersRepository.port";
import {UserCredentials} from "../../Domain/Vo/UserCredentials";

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    constructor(@Inject(UsersRepositoryKey) private readonly usersRepository: IUsersRepositoryPort) {}
    async execute(command: SignInCommand): Promise<any> {
        const user = await this.usersRepository.findByUsername(command.signInDto.username);

        if (!user) throw new BadRequestException("Bad Login or password");

        const snapshot = user.getSnapshot();

        const userCredentials = new UserCredentials(command.signInDto.username, command.signInDto.password).hash();

        if (!userCredentials.isEqual(snapshot.userCredentials)) throw new BadRequestException("Bad Login or Password");

        const access_token = jwt.sign({sub: snapshot.id}, "secret", {expiresIn: 60 * 60});
        const refresh_token = jwt.sign({}, "secret", {expiresIn: 60 * 600});
        return Promise.resolve({access_token, refresh_token});
    }
}
