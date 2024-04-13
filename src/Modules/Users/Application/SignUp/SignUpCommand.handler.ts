import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignUpCommand} from "./SignUp.command";
import {BadRequestException, Inject} from "@nestjs/common";
import {IUsersRepositoryPort, UsersRepositoryKey} from "../../Domain/IUsersRepository.port";
import {UsersAggregate} from "../../Domain/Users.aggregate";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    constructor(@Inject(UsersRepositoryKey) private readonly usersRepository: IUsersRepositoryPort) {}
    async execute(command: SignUpCommand): Promise<void> {
        let user: UsersAggregate = await this.usersRepository.findByUsername(command.signUpDto.username);

        if (user) throw new BadRequestException("user with this username already exists!");

        user = UsersAggregate.create(command.signUpDto);

        await this.usersRepository.save(user);

        return Promise.resolve(undefined);
    }
}
