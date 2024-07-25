import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from 'data-source'

import { PeopleModule } from "./swapi/people/people.module";
import { PlanetsModule } from "./swapi/planets/planets.module";
import { FilmsModule } from "./swapi/films/films.module";
import { SpeciesModule } from "./swapi/species/species.module";
import { StarshipsModule } from "./swapi/starships/starships.module";
import { VehiclesModule } from "./swapi/vehicles/vehicles.module";
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    TypeOrmModule.forRoot(AppDataSource.options),
    PeopleModule,
    PlanetsModule,
    FilmsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    ImagesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
