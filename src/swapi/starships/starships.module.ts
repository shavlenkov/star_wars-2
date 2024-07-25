import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Starship } from "./entities/starship.entity";

import { StarshipsController } from "./starships.controller";
import { StarshipsService } from "./starships.service";
import { UsersModule } from "../../users/users.module";

import { Film } from "../films/entities/film.entity";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Starship, Film])],
    controllers: [StarshipsController],
    providers: [StarshipsService],
})
export class StarshipsModule {}
