import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from "../../roles/roles.enum";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Roles })
    role: Roles;

}

