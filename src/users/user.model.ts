import * as moongoose from 'mongoose';

export const UserSchema = new moongoose.Schema({
    email: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
})

export interface User extends moongoose.Document{
    id: string;
    email: string;
    password: string
}