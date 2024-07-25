import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

import { Roles } from "../roles/roles.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({username: username})
    }

    async create(username: string, password: string): Promise<User> {
        const user = this.usersRepository.create({
            username: username,
            password: password,
            role: Roles.USER
        });

        return this.usersRepository.save(user);
    }

}
