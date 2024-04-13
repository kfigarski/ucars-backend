import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ChangePasswordCommand} from "./ChangePassword.command";
import {BadRequestException, Inject} from "@nestjs/common";
import {IUsersRepositoryPort, UsersRepositoryKey} from "../../Domain/IUsersRepository.port";
import {UsersAggregate} from "../../Domain/Users.aggregate";
import {UserCredentials} from "../../Domain/Vo/UserCredentials";

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand> {
    constructor(@Inject(UsersRepositoryKey) private readonly usersRepository: IUsersRepositoryPort) {}

    async execute(command: ChangePasswordCommand): Promise<void> {
        const user: UsersAggregate = await this.usersRepository.findByUsername(command.changePasswordDto.username);

        if (!user) throw new BadRequestException("");

        const snapshot = user.getSnapshot();

        const userCredentials = new UserCredentials(
            command.changePasswordDto.username,
            command.changePasswordDto.oldPassword
        ).hash();

        if (!snapshot.userCredentials.isEqual(userCredentials)) {
            throw new BadRequestException("Bad login or password");
        }

        user.changePassword(command.changePasswordDto.newPassword);

        this.usersRepository.save(user);
    }
}
