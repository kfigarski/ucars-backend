import {ICommand} from "@nestjs/cqrs";
import {ChangePasswordDTO} from "../../Domain/DTO/ChangePasswordDTO";

export class ChangePasswordCommand implements ICommand {
    constructor(public changePasswordDto: ChangePasswordDTO) {}
}
