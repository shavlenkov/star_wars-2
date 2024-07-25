import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Film } from "./entities/film.entity";

import { FilmsController } from "./films.controller";
import { FilmsService } from "./films.service";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Film])],
    controllers: [FilmsController],
    providers: [FilmsService],
})
export class FilmsModule {}
