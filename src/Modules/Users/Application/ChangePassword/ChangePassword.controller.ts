import {CommandBus} from "@nestjs/cqrs";
import {Body, Controller, Post} from "@nestjs/common";
import {ChangePasswordDTO} from "../../Domain/DTO/ChangePasswordDTO";
import {ChangePasswordCommand} from "./ChangePassword.command";

@Controller()
export class ChangePasswordController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post("/users/change-password")
    async changePassword(@Body() changePasswordDto: ChangePasswordDTO) {
        return await this.commandBus.execute(new ChangePasswordCommand(changePasswordDto));
    }
}
