import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Starship } from "./entities/starship.entity";

import { CreateStarshipDto } from "./dto/create-starship.dto";
import { UpdateStarshipDto } from "./dto/update-starship.dto";

import { Film } from "../films/entities/film.entity";

@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starship)
        private starshipsRepository: Repository<Starship>,
        @InjectRepository(Film)
        private readonly filmsRepository: Repository<Film>,
    ) {}

    paginate(options: IPaginationOptions): Promise<Pagination<Starship>> {
        return paginate<Starship>(this.starshipsRepository, options, {
            relations: ['pilots', 'films']
        });
    }

    async findOne(id: number) {
        let starship = await this.starshipsRepository.findOne({
            where: {
                id: id
            },
            relations: ['pilots', 'films']
        })

        return starship;
    }

    async store(data: CreateStarshipDto) {

        let starship = await this.starshipsRepository.create(data);

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        starship.films = films;

        await this.starshipsRepository.save(data);

        return true;
    }

    async update(id: number, data: UpdateStarshipDto) {

        let starship = await this.starshipsRepository.findOne({where: {id: id}, relations: ["films"]})

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        starship.films = films;

        await this.starshipsRepository.save(starship)

        return true;
    }
    async delete(id: number) {

        await this.starshipsRepository.delete(id);

        return true;

    }

}