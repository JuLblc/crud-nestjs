import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async insertUser(email: string, password: string) {
        const newUser = new this.userModel({
            email: email,
            password: password
        });
        const createdUser = await newUser.save();
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
        const result = await this.userModel.deleteOne({_id: userId}).exec();
        console.log('removeUser result',result)  
        if (result.deletedCount === 0){
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