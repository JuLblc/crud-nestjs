import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from "./users.service";
import { UserSchema } from "./user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule { }