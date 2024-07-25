import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

import { Planet } from "../../planets/entities/planet.entity";
import { Film } from "../../films/entities/film.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Specie } from "../../species/entities/specie.entity";
import { Starship } from "../../starships/entities/starship.entity";
import { Image } from "../../../images/entities/images.entity";

@Entity('people')
export class People {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    height: string;

    @Column()
    mass: string;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @JoinColumn()
    @ManyToOne(() => Planet, (planet) => planet.residents, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    homeworld: Planet;

    @JoinTable({name: 'people_films'})
    @ManyToMany(() => Film, (film) => film.characters, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    films: Film[];

    @JoinTable({name: 'people_vehicles'})
    @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    vehicles: Vehicle[];

    @JoinTable({name: 'people_species'})
    @ManyToMany(() => Specie, (specie) => specie.people, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    species: Specie[];

    @JoinTable({name: 'people_starships'})
    @ManyToMany(() => Starship, (starship) => starship.pilots, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    starships: Starship[]

    @JoinTable({name: 'people_images'})
    @ManyToMany(() => Image, (image) => image.people, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    images: Image[]

}