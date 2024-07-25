import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Specie } from "./entities/specie.entity";

import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { UsersModule } from "../../users/users.module";

import { Film } from "../films/entities/film.entity";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Specie, Film])],
    controllers: [SpeciesController],
    providers: [SpeciesService],
})
export class SpeciesModule {}
