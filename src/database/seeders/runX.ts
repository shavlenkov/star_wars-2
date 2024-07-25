import { Factory, Seeder } from "typeorm-seeding";
import { Connection, In } from "typeorm";

import axios from 'axios';

import { People } from "../../swapi/people/entities/people.entity";
import { Planet } from "../../swapi/planets/entities/planet.entity";
import { Film } from "../../swapi/films/entities/film.entity";
import { Vehicle } from "../../swapi/vehicles/entities/vehicle.entity";
import { Specie } from "../../swapi/species/entities/specie.entity";
import { Starship } from "../../swapi/starships/entities/starship.entity";

export default class InitialDatabaseSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        let url = 'https://swapi.dev/api/people?page=1';

        for(;;) {

            let response = await axios.get(url);

            let results = response.data.results;

            const planetRepository = await connection.getRepository(Planet);
            const filmsRepository = await connection.getRepository(Film);
            const vehiclesRepository = await connection.getRepository(Vehicle);
            const speciesRepository = await connection.getRepository(Specie);
            const starshipsRepository = await connection.getRepository(Starship);

            for (let i = 0; i < results.length; i++) {

                const planet = await planetRepository.findOne({
                    where: {
                        id: Number(results[i].homeworld.split('https://swapi.dev/api/planets/')[1].split('/')[0])
                    }
                })

                let film_urls = results[i].films;

                let film_ids = film_urls.map((url) => {
                    return  Number(url.split('https://swapi.dev/api/films/')[1].split('/')[0])
                })

                const films = await filmsRepository.find({
                    where: {
                        id: In([...film_ids])
                    }
                })

                let vehicle_urls = results[i].vehicles;

                let vehicle_ids = []

                if(vehicle_urls.length != 0) {
                    vehicle_ids = vehicle_urls.map((url) => {
                        return Number(url.split('https://swapi.dev/api/vehicles/')[1].split('/')[0])
                    })
                }

                let vehicles = [];

                if(vehicle_ids.length != 0) {
                    vehicles = await vehiclesRepository.find({
                        where: {
                            id: In([...vehicle_ids])
                        }
                    })
                }

                let specie_urls = results[i].species;

                let specie_ids = []

                if(specie_urls.length != 0) {
                    specie_ids = specie_urls.map((url) => {
                        return Number(url.split('https://swapi.dev/api/species/')[1].split('/')[0])
                    })
                }

                let species = [];

                if(specie_ids.length != 0) {
                    species = await speciesRepository.find({
                        where: {
                            id: In([...specie_ids])
                        }
                    })
                }

                let starship_urls = results[i].starships;

                let starship_ids = []

                if(starship_urls.length != 0) {
                    starship_ids = starship_urls.map((url) => {
                        return Number(url.split('https://swapi.dev/api/starships/')[1].split('/')[0])
                    })
                }

                let starships = [];

                if(starship_ids.length != 0) {
                    starships = await starshipsRepository.find({
                        where: {
                            id: In([...starship_ids])
                        }
                    })
                }

                let people_obj = {
                    name: results[i].name,
                    height: results[i].height,
                    mass: results[i].mass,
                    hair_color: results[i].hair_color,
                    eye_color: results[i].eye_color,
                    skin_color: results[i].skin_color,
                    birth_year: results[i].birth_year,
                    gender: results[i].gender,
                    created: results[i].created,
                    edited: results[i].edited,
                    url: results[i].url,
                    homeworld: planet,
                    films: films,
                    vehicles: vehicles,
                    species: species,
                    starships: starships
                }


                let people = await connection
                    .createQueryBuilder()
                    .insert()
                    .into(People)
                    .values(people_obj)
                    .execute()

                const relation1 = await connection
                    .createQueryBuilder()
                    .relation(People, 'films')
                    .of(people.identifiers[0].id)
                    .add(films);

                const relation2 = await connection
                    .createQueryBuilder()
                    .relation(People, 'vehicles')
                    .of(people.identifiers[0].id)
                    .add(vehicles);

                const relation3 = await connection
                    .createQueryBuilder()
                    .relation(People, 'species')
                    .of(people.identifiers[0].id)
                    .add(species);

                const relation4 = await connection
                    .createQueryBuilder()
                    .relation(People, 'starships')
                    .of(people.identifiers[0].id)
                    .add(starships);

            }

            if(response.data.next == null) {
                break
            }

            url = response.data.next;

        }

    }

}