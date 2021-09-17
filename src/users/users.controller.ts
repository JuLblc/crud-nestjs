import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Post()
    addNewUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        return this.usersService.insertUser(userEmail, userPassword)
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.usersService.getUser(userId)
    }

    @Patch(':id')
    updateUser(
        @Param('id') userId: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        this.usersService.updateUser(userId, userEmail, userPassword)
    }

    @Delete(':id')
    removeUser(@Param('id') userId: string) {
        this.usersService.removeUser(userId)
    }
}