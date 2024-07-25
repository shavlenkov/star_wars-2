import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { People } from "../../swapi/people/entities/people.entity";

@Entity('images')
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToMany(() => People, (people) => people.images)
    people: People[];

}