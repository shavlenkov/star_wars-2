import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn(@Body() signInDto: SignInDto) {

        let { username, password } = signInDto;

        return this.authService.signIn(username, password);
    }

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {

        let { username, password } = signUpDto;

        return this.authService.signUp(username, password);
    }

}