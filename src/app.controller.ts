import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Request} from "@nestjs/common";

import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";
import { ProductsService } from "./products/products.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthenticatedGuard } from "./auth/authenticated.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) {}

  /* HOMEPAGE */
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

  /* CALL API */
  @UseGuards(AuthenticatedGuard)
  @Get('product')
  getProduct(@Body("id") productId: string) {
    const product = this.productsService.getProduct(productId)
    return product;
  }

  /* UPDATE USER */
  @UseGuards(AuthenticatedGuard)
  @Patch('user')
  async updateUser(
    @Request() req,
    @Body("email") userEmail: string,
    @Body("password") userPassword: string
  ) {
    const user = await this.usersService.updateUser(
      req.user.id,
      userEmail,
      userPassword
    );
    return user;
  }
}
