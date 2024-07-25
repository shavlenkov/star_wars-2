import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { People } from "../../people/entities/people.entity";
import { Film } from "../../films/entities/film.entity";

@Entity('species')
export class Specie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    average_height: string;

    @Column()
    skin_colors: string;

    @Column()
    hair_colors: string;

    @Column()
    eye_colors: string;

    @Column()
    average_lifespan: string;

    @Column()
    language: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @ManyToMany(() => People, (people) => people.species)
    people: People[]

    @JoinTable({name: 'films_species'})
    @ManyToMany(() => Film, (film) => film.species)
    films: Film[]

}