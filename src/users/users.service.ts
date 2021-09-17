import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model'
@Injectable()
export class UsersService {
    private users: User[] = [];

    insertUser(email: string, password: string) {
        const userId = (this.users.length + 1).toString();
        const newUser = new User(userId, email, password);
        this.users.push(newUser);
        return newUser;
    }

    getAllUsers() {
        return [...this.users];
    }

    getUser(userId: string) {
        const user = this.findUser(userId)[0];
        return { ...user };
    }

    updateUser(
        userId: string,
        email: string,
        password: string,
    ) {
        const user = this.findUser(userId)[0];
        const index = this.findUser(userId)[1];
        const updatedUser = { ...user }
        if (email) {
            updatedUser.email = email;
        }
        if (password) {
            updatedUser.password = password;
        }
        this.users[index] = updatedUser;
    }

    removeUser(userId: string) {
        const user = this.findUser(userId)[0];
        const index = this.findUser(userId)[1];
        this.users.splice(index, 1);
    }

    private findUser(id: string): [User, number] {
        const userIndex = this.users.findIndex(user => user.id === id);
        const user = this.users[userIndex];
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return [user, userIndex];
    }
}