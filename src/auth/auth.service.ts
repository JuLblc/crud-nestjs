import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UsersService } from "../users/users.service";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async userAuthentication(email: string, password: string) {

        // 1. Check username and password are not empty
        if (!email || !password) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Please enter email and password'
            }, HttpStatus.BAD_REQUEST)
        }

        //2. Check si user est dans la base
        const user = await this.usersService.getUserByEmail(email);

        //3. Check password OK
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Incorrect password'
            }, HttpStatus.FORBIDDEN)
        }
        
        return user;
    }
}