import {ICommand} from "@nestjs/cqrs";
import {SignInDTO} from "../../Domain/DTO/SignInDTO";

export class SignInCommand implements ICommand {
    constructor(public signInDto: SignInDTO) {}
}
