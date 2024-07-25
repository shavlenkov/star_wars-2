import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { People } from "../../people/entities/people.entity";
import { Film } from "../../films/entities/film.entity";

@Entity('starships')
export class Starship {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: string;

    @Column()
    length: string;

    @Column()
    max_atmosphering_speed: string;

    @Column()
    crew: string;

    @Column()
    passengers: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column()
    hyperdrive_rating: string;

    @Column()
    MGLT: string;

    @Column()
    starship_class: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @ManyToMany(() => People, (people) => people.starships)
    pilots: People[]

    @JoinTable({name: 'films_starships'})
    @ManyToMany(() => Film, (film) => film.starships)
    films: Film[]

}