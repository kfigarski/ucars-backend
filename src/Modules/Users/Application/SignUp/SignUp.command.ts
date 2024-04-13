import {ICommand} from "@nestjs/cqrs";
import {SignUpDTO} from "../../Domain/DTO/SignUpDTO";

export class SignUpCommand implements ICommand {
    constructor(public signUpDto: SignUpDTO) {}
}
