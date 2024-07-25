import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { People } from "../../people/entities/people.entity";
import { Film } from "../../films/entities/film.entity";

@Entity('vehicles')
export class Vehicle {

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
    vehicle_class: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @ManyToMany(() => People, (people) => people.vehicles)
    pilots: People[]

    @JoinTable({name: 'films_vehicles'})
    @ManyToMany(() => Film, (film) => film.vehicles)
    films: Film[]

}