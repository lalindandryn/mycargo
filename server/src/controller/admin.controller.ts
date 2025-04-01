import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/service/user.service";

@Controller('admin')
export class AdminController {
    constructor(private userService: UserService) {}

    @Get('users')
    async getUsers() {
        return this.userService.findAll();
    }
}