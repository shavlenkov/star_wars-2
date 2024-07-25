import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { People } from "../../people/entities/people.entity";
import { Specie } from "../../species/entities/specie.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Starship } from "../../starships/entities/starship.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";

@Entity('films')
export class Film {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    episode_id: number;

    @Column("longtext")
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column()
    release_date: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @ManyToMany(() => People, (people) => people.films)
    characters: People[]

    @ManyToMany(() => Specie, (specie) => specie.films)
    species: Specie[]

    @ManyToMany(() => Planet, (planet) => planet.films)
    planets: Planet[]

    @ManyToMany(() => Starship, (starship) => starship.films)
    starships: Starship[]

    @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
    vehicles: Vehicle[]

}