import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {SignUpCommand} from "./SignUp.command";
import {SignUpDTO} from "../../Domain/DTO/SignUpDTO";

@Controller()
export class SignUpController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post("/users/signup")
    async signUp(@Body() signUpDto: SignUpDTO) {
        return await this.commandBus.execute(new SignUpCommand(signUpDto));
    }
}
