import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthenticatedGuard } from "./auth/authenticated.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /* CREATION USER ACCOUNT */
  @Post("users")
  async addNewUser(
    @Body("email") userEmail: string,
    @Body("password") userPassword: string
  ) {
    const newUser = await this.usersService.insertUser(userEmail, userPassword);
    return newUser;
  }

  /* LOG IN */
  @UseGuards(LocalAuthGuard)
  @Post("sessions")
  login(@Request() req) {
    return req.user;
  }

  @Get("users")
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get("user/:id")
  async getUser(@Param("id") userId: string) {
    const user = await this.usersService.getUserById(userId);
    return user;
  }

  // UPDATE USER //
  @UseGuards(AuthenticatedGuard)
  @Patch("user/:id")
  async updateUser(
    @Param("id") userId: string,
    @Body("email") userEmail: string,
    @Body("password") userPassword: string
  ) {
    const user = await this.usersService.updateUser(
      userId,
      userEmail,
      userPassword
    );
    return user;
  }

  // DELETE USER //
  @Delete("user/:id")
  async removeUser(@Param("id") userId: string) {
    await this.usersService.removeUser(userId);
  }
}
