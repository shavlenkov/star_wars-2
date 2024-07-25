import { Factory, Seeder } from "typeorm-seeding";
import { Connection, In } from "typeorm";

import axios from 'axios';

import { Film } from "../../swapi/films/entities/film.entity";
import { Planet } from "../../swapi/planets/entities/planet.entity";

export default class InitialDatabaseSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        let url = 'http://swapi.dev/api/planets?page=1';

        for(;;) {

            let response = await axios.get(url);

            let results = response.data.results;

            const filmsRepository = await connection.getRepository(Film);

            for (let i = 0; i < results.length; i++) {

                let film_urls = results[i].films;

                let film_ids = film_urls.map((url) => {
                    return Number(url.split('https://swapi.dev/api/films/')[1].split('/')[0])
                })

                const films = await filmsRepository.find({
                    where: {
                        id: In([...film_ids])
                    }
                })

                let planet_obj = {
                    name: results[i].name,
                    rotation_period: results[i].rotation_period,
                    orbital_period: results[i].orbital_period,
                    diameter: results[i].diameter,
                    climate:  results[i].climate,
                    gravity: results[i].gravity,
                    terrain: results[i].terrain,
                    surface_water: results[i].surface_water,
                    population: results[i].population,
                    created: results[i].created,
                    edited: results[i].edited,
                    url: results[i].url,
                    films: films
                }

                let planet = await connection
                    .createQueryBuilder()
                    .insert()
                    .into(Planet)
                    .values(planet_obj)
                    .execute();

                const relation = await connection
                    .createQueryBuilder()
                    .relation(Planet, 'films')
                    .of(planet.identifiers[0].id)
                    .add(films);

            }

            if(response.data.next == null) {
                break
            }

            url = response.data.next;

        }

    }

}