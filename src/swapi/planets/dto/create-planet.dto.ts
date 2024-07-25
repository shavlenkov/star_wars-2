import { IsNotEmpty } from 'class-validator';

export class CreatePlanetDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    rotation_period: string;

    @IsNotEmpty()
    orbital_period: string;

    @IsNotEmpty()
    diameter: string;

    @IsNotEmpty()
    climate: string;

    @IsNotEmpty()
    gravity: string;

    @IsNotEmpty()
    terrain: string;

    @IsNotEmpty()
    surface_water: string;

    @IsNotEmpty()
    population: string;

    @IsNotEmpty()
    created: string;

    @IsNotEmpty()
    edited: string

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    filmIds: Array<number>;

}