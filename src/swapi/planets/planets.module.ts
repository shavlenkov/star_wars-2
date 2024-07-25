import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Planet } from "./entities/planet.entity";

import { PlanetsController } from "./planets.controller";
import { PlanetsService } from "./planets.service";
import { UsersModule } from "../../users/users.module";

import { Film } from "../films/entities/film.entity";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Planet, Film])],
    controllers: [PlanetsController],
    providers: [PlanetsService],
})
export class PlanetsModule {}
