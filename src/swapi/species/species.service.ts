import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Specie } from "./entities/specie.entity";

import { CreateSpecieDto } from "./dto/create-specie.dto";
import { UpdateSpecieDto } from "./dto/update-specie.dto";

import { Film } from "../films/entities/film.entity";

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Specie)
        private speciesRepository: Repository<Specie>,
        @InjectRepository(Film)
        private readonly filmsRepository: Repository<Film>,
    ) {}

    paginate(options: IPaginationOptions): Promise<Pagination<Specie>> {
        return paginate<Specie>(this.speciesRepository, options, {
            relations: ['people', 'films']
        });
    }

    async findOne(id: number) {

        let specie = await this.speciesRepository.findOne({
            where: {
                id: id
            },
            relations: ['people', 'films']
        })

        return specie;

    }

    async store(data: CreateSpecieDto) {

        let specie = await this.speciesRepository.create(data);

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        specie.films = films;

        await this.speciesRepository.save(data);

        return true;
    }

    async update(id: number, data: UpdateSpecieDto) {

        let specie = await this.speciesRepository.findOne({where: {id: id}, relations: ["films"]})

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        specie.films = films;

        await this.speciesRepository.save(specie)

        return true;
    }

    async delete(id: number) {

        await this.speciesRepository.delete(id);

        return true;

    }

}