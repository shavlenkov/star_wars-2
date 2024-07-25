import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Film } from "./entities/film.entity";

import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
    ) {}

    paginate(options: IPaginationOptions): Promise<Pagination<Film>> {
        return paginate<Film>(this.filmsRepository, options, {
            relations: ['characters', 'planets', 'species', 'starships']
        });
    }

    async findOne(id: number) {

        let film = await this.filmsRepository.findOne({
            where: {
                id: id
            },
            relations: ['characters','planets', 'species', 'starships'],
        });

        return film;

    }

    store(data: CreateFilmDto) {
        return this.filmsRepository.save(data);
    }

    async update(id: number, data: UpdateFilmDto) {

        await this.filmsRepository.update(id, data);

        return true;
    }

    async delete(id: number) {

        await this.filmsRepository.delete(id);

        return true;

    }
}
