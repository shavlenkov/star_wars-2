import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string) {

        const user = await this.usersService.findOne(username);

        const { password, ...result } = user;
        const payload = { username: result.username, sub: result.id };

        if(await bcrypt.compare(pass, user.password)) {
            return {
                access_token: this.jwtService.sign(payload),
            };
        } else {
            throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
        }

    }

    async signUp(username: string, pass: string) {

        const hashedPassword = await bcrypt.hash(pass, 10);

        const newUser = await this.usersService.create(username, hashedPassword);

        const payload = { username: newUser.username, sub: newUser.id };

        return {
            access_token: this.jwtService.sign(payload),
        };

    }

}