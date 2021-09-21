import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { User } from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async insertUser(email: string, password: string) {
    // 1. Check username and password are not empty
    if (!email || !password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Please enter email and password",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    // 2. Check if email adress is valid
    this.isEmailAdressValid(email);

    // 3. Check if password is strong enough
    this.isPwdStrong(password);

    // 4. Password Hashing
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    // 5. Create user
    const newUser = new this.userModel({
      email: email,
      password: hash,
    });

    // 6. Check if email is unique in DB
    let createdUser = await newUser.save().catch(() => {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "Email adress already taken",
        },
        HttpStatus.CONFLICT
      );
    });

    return createdUser as User;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "Could not find Email Adress",
        },
        HttpStatus.FORBIDDEN
      );
    }
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    } as User;
  }

  async updateUser(userId: string, email: string, password: string) {
    const updatedUser = await this.findUserById(userId);
    // 1. if email isn't empty and valid => Update
    if (email && this.isEmailAdressValid(email)) {
      updatedUser.email = email;
    }

    // 2. if pwd isn't empty and strong => Update
    if (password && this.isPwdStrong(password)) {
      // Password Hashing
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      updatedUser.password = hash;
    }

    // 3. Check if new email is unique in DB
    await updatedUser.save().catch(() => {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "Email adress already taken",
        },
        HttpStatus.CONFLICT
      );
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      password: updatedUser.password,
    } as User;
  }

  private async findUserById(id: string): Promise<User> {
    let user;

    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Could not find user");
    }

    if (!user) {
      throw new NotFoundException("Could not find user");
    }
    return user;
  }

  private isEmailAdressValid(email: string) {
    const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
    if (!regexEmail.test(email)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "Please enter a valid Email adress",
        },
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }

  private isPwdStrong(password: string) {
    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regexPassword.test(password)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error:
            "Password should contain at least: 6 caracters, 1 number, 1 uppercase and 1 lowercase",
        },
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }
}
