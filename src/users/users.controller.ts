import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async addNewUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        const newUser = await this.usersService.insertUser(userEmail, userPassword);
        return newUser;
    }

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getAllUsers()
        return users;
    }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
        const user = await this.usersService.getUser(userId);
        return user;
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        const user = await this.usersService.updateUser(userId, userEmail, userPassword)
        return user;
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.usersService.removeUser(userId)        
    }
}