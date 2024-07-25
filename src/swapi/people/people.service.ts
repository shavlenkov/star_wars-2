import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { People } from './entities/people.entity';

import {
    paginate,
    Pagination,
    IPaginationOptions
} from 'nestjs-typeorm-paginate';

import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";

import { ImagesService } from "../../images/images.service";

import { Film } from "../films/entities/film.entity";
import { Specie } from "../species/entities/specie.entity";
import { Starship } from "../starships/entities/starship.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Planet } from "../planets/entities/planet.entity";

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Planet)
        private readonly planetsRepository: Repository<Planet>,
        @InjectRepository(People)
        private readonly peopleRepository: Repository<People>,
        @InjectRepository(Film)
        private readonly filmsRepository: Repository<Film>,
        @InjectRepository(Specie)
        private readonly speciesRepository: Repository<Specie>,
        @InjectRepository(Starship)
        private readonly starshipsRepository: Repository<Starship>,
        @InjectRepository(Vehicle)
        private readonly vehiclesRepository: Repository<Vehicle>,
        private imagesService: ImagesService
    ) {}

    paginate(options: IPaginationOptions): Promise<Pagination<People>> {
        return paginate<People>(this.peopleRepository, options, {
            relations: ['homeworld', 'films', 'species', 'vehicles', 'starships', 'images']
        });
    }

    async findOne(id: number) {
       let people = await this.peopleRepository.findOne({
            where: {
                id: id
            },
            relations: ['homeworld', 'films', 'species', 'vehicles', 'starships', 'images'],
        });

        return people;
    }

   async store(data: CreatePeopleDto) {

        let people = await this.peopleRepository.create(data);

        const films = await this.filmsRepository.find({
            where: {
                id: In([1,2,3])
            }
        })

       const species = await this.speciesRepository.find({
           where: {
               id: In([1,2,3])
           }
       })

       const starships = await this.starshipsRepository.find({
           where: {
               id: In([1,2,3])
           }
       })
       const vehicles = await this.vehiclesRepository.find({
           where: {
               id: In([1,2,3])
           }
       })

       const homeworld = await this.planetsRepository.findOne({
           where: {
               id: 1
           }
       })


       people.homeworld = homeworld

       people.films = films;
       people.species = species;
       people.starships = starships;
       people.vehicles = vehicles;

       return this.peopleRepository.save(people);

    }

    async update(id: number, data: UpdatePeopleDto) {

        let people = await this.peopleRepository.findOne({
            where: {
                id: id
            },
            relations: ['homeworld', 'films', 'species', 'vehicles', 'starships', 'images'],
        });

        const films = await this.filmsRepository.find({
            where: {
                id: In([...data.filmIds])
            }
        })

        const species = await this.speciesRepository.find({
            where: {
                id: In([...data.specieIds])
            }
        })

        const starships = await this.starshipsRepository.find({
            where: {
                id: In([...data.starshipIds])
            }
        })

        const vehicles = await this.vehiclesRepository.find({
            where: {
                id: In([...data.vehicleIds])
            }
        })

        people.films = films;
        people.species = species;
        people.starships = starships;
        people.vehicles = vehicles;

        await this.peopleRepository.save(people);

        return true;

    }
    async delete(id: number) {

        let people = await this.peopleRepository.findOne({
            where: {
                id: id
            },
            relations: ['homeworld', 'films', 'species', 'vehicles', 'starships', 'images'],
        });

        let urls = people['images'];

        await this.imagesService.deleteImages(urls)

        await this.peopleRepository.delete(id);

        return true;

    }

}