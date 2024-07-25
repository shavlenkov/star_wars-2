import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import axios from 'axios';

import { Film } from "../../swapi/films/entities/film.entity";

export default class InitialDatabaseSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        let url = 'https://swapi.dev/api/films?page=1';

        let response = await axios.get(url);

        let results = response.data.results;

        for (let i = 0; i < results.length; i++) {

            let film_obj = {
                title: results[i].title,
                episode_id: results[i].episode_id,
                opening_crawl: results[i].opening_crawl,
                director: results[i].director,
                producer: results[i].producer,
                release_date: results[i].release_date,
                created: results[i].created,
                edited: results[i].edited,
                url: results[i].url,
            }

            const film = await connection
                .createQueryBuilder()
                .insert()
                .into(Film)
                .values(film_obj)
                .execute();

        }
    }
}
