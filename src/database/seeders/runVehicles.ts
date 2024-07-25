import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import axios from 'axios';

import { Vehicle } from "../../swapi/vehicles/entities/vehicle.entity";
import { Film } from "../../swapi/films/entities/film.entity";

export default class InitialDatabaseSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        let url = 'https://swapi.dev/api/vehicles?page=1';

        const filmsRepository = await connection.getRepository(Film);

        for(;;) {

            let response = await axios.get(url);

            let results = response.data.results;

            for (let i = 0; i < results.length; i++) {

                let film_urls = results[i].films;

                let film_ids = film_urls.map((url) => {
                    return {id: Number(url.split('https://swapi.dev/api/films/')[1].split('/')[0])}
                })

                const films = await filmsRepository.find({
                    where: film_ids
                })

                let vehicle_obj = {
                    name: results[i].name,
                    model: results[i].model,
                    manufacturer: results[i].manufacturer,
                    cost_in_credits: results[i].cost_in_credits,
                    length: results[i].length,
                    max_atmosphering_speed: results[i].max_atmosphering_speed,
                    crew: results[i].crew,
                    passengers: results[i].passengers,
                    cargo_capacity: results[i].cargo_capacity,
                    consumables: results[i].consumables,
                    vehicle_class: results[i].vehicle_class,
                    created: results[i].created,
                    edited: results[i].edited,
                    url: results[i].url,
                    films: films
                }

                let vehicle = await connection
                    .createQueryBuilder()
                    .insert()
                    .into(Vehicle)
                    .values(vehicle_obj)
                    .execute();

                const relation = await connection
                    .createQueryBuilder()
                    .relation(Vehicle, 'films')
                    .of(vehicle.identifiers[0].id)
                    .add(films);
            }

            if(response.data.next == null) {
                break
            }

            url = response.data.next;

        }

    }

}