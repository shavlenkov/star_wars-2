import { Module } from '@nestjs/common';

import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";

import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';

import { ImagesModule } from "../../images/images.module";
import { UsersModule } from "../../users/users.module";

import { Film } from "../films/entities/film.entity";
import { Specie } from "../species/entities/specie.entity";
import { Starship } from "../starships/entities/starship.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Planet } from "../planets/entities/planet.entity";



@Module({
    imports: [UsersModule, ImagesModule,TypeOrmModule.forFeature([People, Planet, Film, Specie, Starship, Vehicle])],
    controllers: [PeopleController],
    providers: [PeopleService],
})
export class PeopleModule {}
