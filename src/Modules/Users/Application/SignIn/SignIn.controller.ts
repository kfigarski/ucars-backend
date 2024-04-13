import {CommandBus} from "@nestjs/cqrs";
import {Body, Controller, Post} from "@nestjs/common";
import {SignInCommand} from "./SignIn.command";
import {SignInDTO} from "../../Domain/DTO/SignInDTO";

@Controller()
export class SignInController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post("users/token")
    async signIn(@Body() signInDto: SignInDTO) {
        return await this.commandBus.execute(new SignInCommand(signInDto));
    }
}
