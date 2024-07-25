import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Vehicle } from "./entities/vehicle.entity";

import { VehiclesService } from "./vehicles.service";
import { VehiclesController } from "./vehicles.controller";
import { UsersModule } from "../../users/users.module";

import { Film } from "../films/entities/film.entity";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Vehicle, Film])],
    controllers: [VehiclesController],
    providers: [VehiclesService],
})
export class VehiclesModule {}
