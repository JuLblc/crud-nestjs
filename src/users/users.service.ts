import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async insertUser(email: string, password: string) {

        // 1. Check username and password are not empty
        if (!email || !password) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Please enter email and password'
            }, HttpStatus.BAD_REQUEST)
        }

        // 2. Check if email adress is valid
        const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
        if (!regexEmail.test(email)) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Please enter a valid Email adress'
            }, HttpStatus.FORBIDDEN)
        }

        // 3. Check if password is strong enough
        const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regexPassword.test(password)) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password should contain at least: 6 caracters, 1 number, 1 uppercase and 1 lowercase'
            }, HttpStatus.FORBIDDEN)
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const newUser = new this.userModel({
            email: email,
            password: hash
        });

        let createdUser = await newUser
            .save()
            .catch(() => {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: 'Email adress already taken'
                }, HttpStatus.CONFLICT)
            })

        console.log('insertUser result', createdUser)
        return createdUser as User;
    }

    async getAllUsers() {
        const users = await this.userModel.find().exec();
        console.log('getAllUsers result', users)
        return users.map(user => ({
            id: user.id,
            email: user.email,
            password: user.password
        })) as User[];
    }

    async getUser(userId: string) {
        const user = await this.findUser(userId);
        console.log('getUser result', user)
        return {
            id: user.id,
            email: user.email,
            password: user.password
        } as User;
    }

    async updateUser(
        userId: string,
        email: string,
        password: string,
    ) {
        const updatedUser = await this.findUser(userId);

        if (email) {
            updatedUser.email = email;
        }
        if (password) {
            updatedUser.password = password;
        }
        await updatedUser.save();
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            password: updatedUser.password
        } as User;
    }

    async removeUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        console.log('removeUser result', result)
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find user');
        }
    }

    private async findUser(id: string): Promise<User> {
        let user;

        try {
            user = await this.userModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find user');
        }

        if (!user) {
            throw new NotFoundException('Could not find user');
        }

        return user;
    }
}