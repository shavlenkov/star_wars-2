import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import axios from 'axios';

import { Specie } from "../../swapi/species/entities/specie.entity";
import { Film } from "../../swapi/films/entities/film.entity";

export default class InitialDatabaseSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        let url = 'https://swapi.dev/api/species?page=1';

        for(;;) {

            let response = await axios.get(url);

            let results = response.data.results;

            const filmsRepository = await connection.getRepository(Film);

            for (let i = 0; i < results.length; i++) {

                let film_urls = results[i].films;

                let film_ids = film_urls.map((url) => {
                    return {id: Number(url.split('https://swapi.dev/api/films/')[1].split('/')[0])}
                })

                const films = await filmsRepository.find({
                    where: film_ids
                })

                let specie_obj = {
                    name: results[i].name,
                    classification: results[i].classification,
                    average_height: results[i].average_height,
                    skin_colors: results[i].skin_colors,
                    hair_colors: results[i].hair_colors,
                    eye_colors: results[i].eye_colors,
                    average_lifespan: results[i].average_lifespan,
                    language: results[i].language,
                    created: results[i].created,
                    edited: results[i].edited,
                    url: results[i].url,
                    films: films
                }

                let specie = await connection
                    .createQueryBuilder()
                    .insert()
                    .into(Specie)
                    .values(specie_obj)
                    .execute();

                const relation = await connection
                    .createQueryBuilder()
                    .relation(Specie, 'films')
                    .of(specie.identifiers[0].id)
                    .add(films);

            }

            if(response.data.next == null) {
                break
            }

            url = response.data.next;

        }

    }

}