import { IsNotEmpty } from 'class-validator';

export class CreatePeopleDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    height: string;

    @IsNotEmpty()
    mass: string;

    @IsNotEmpty()
    hair_color: string;

    @IsNotEmpty()
    skin_color: string;

    @IsNotEmpty()
    eye_color: string;

    @IsNotEmpty()
    birth_year: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    created: string;

    @IsNotEmpty()
    edited: string

    @IsNotEmpty()
    url: string

}