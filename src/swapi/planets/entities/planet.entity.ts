import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { People } from "../../people/entities/people.entity";
import { Film } from "../../films/entities/film.entity";

@Entity('planets')
export class Planet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    diameter: string;

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column()
    population: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @OneToMany(() => People, (people) => people.homeworld)
    residents: People[];

    @JoinTable({name: 'planets_films'})
    @ManyToMany(() => Film, (film) => film.planets)
    films: Film[];

}