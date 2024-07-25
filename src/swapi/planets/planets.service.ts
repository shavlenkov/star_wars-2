import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { CreatePlanetDto } from "./dto/create-planet.dto";
import { UpdatePlanetDto } from "./dto/update-planet.dto";
import { Film } from "../films/entities/film.entity";

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
        @InjectRepository(Film)
        private readonly filmsRepository: Repository<Film>,
    ) {}

    paginate(options: IPaginationOptions): Promise<Pagination<Planet>> {
        return paginate<Planet>(this.planetsRepository, options, { relations: ['films'] });
    }

    async findOne(id: number) {
        let planet = await this.planetsRepository.findOne({
            where: {
                id: id
            },
            relations: ['films']
        })

        return planet;

    }

    async store(data: CreatePlanetDto) {

        let planet = await this.planetsRepository.create(data);

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        planet.films = films;

        await this.planetsRepository.save(planet);

        return true;
    }

    async update(id: number, data: UpdatePlanetDto) {

        let planet = await this.planetsRepository.findOne({where: {id: id}, relations: ['films']});

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        planet.films = films;

        await this.planetsRepository.save(planet);

        return true;

    }

    async delete(id: number) {

        await this.planetsRepository.delete(id);

        return true;

    }

}