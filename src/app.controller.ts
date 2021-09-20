import { Controller, Get, Post, Body, Param, Patch, Delete, Req } from "@nestjs/common";
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // CREATION USER ACCOUNT //
  @Post('users')
  async addNewUser(
      @Body('email') userEmail: string,
      @Body('password') userPassword: string
  ) {
      const newUser = await this.usersService.insertUser(userEmail, userPassword);
      return newUser;
  }

  // LOG IN //
  @Post('sessions')
  async userAuthentication(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Req() request: Request
  ){
    
    const userLoggedIn = await this.authService.userAuthentication(userEmail, userPassword);
    console.log('userLoggedIn',userLoggedIn);
    console.log('req',request)
    return userLoggedIn;
  }

  @Get('users')
    async getAllUsers() {
        const users = await this.usersService.getAllUsers()
        return users;
    }

    @Get('user/:id')
    async getUser(@Param('id') userId: string) {
        const user = await this.usersService.getUserById(userId);
        return user;
    }

    // UPDATE USER //
    @Patch('user/:id')
    async updateUser(
        @Param('id') userId: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        const user = await this.usersService.updateUser(userId, userEmail, userPassword)
        return user;
    }

    // DELETE USER //
    @Delete('user/:id')
    async removeUser(@Param('id') userId: string) {
        await this.usersService.removeUser(userId)        
    }
}
