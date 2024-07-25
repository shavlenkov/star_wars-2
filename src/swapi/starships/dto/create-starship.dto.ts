import { IsNotEmpty } from 'class-validator';

export class CreateStarshipDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    manufacturer: string;

    @IsNotEmpty()
    cost_in_credits: string;

    @IsNotEmpty()
    length: string;

    @IsNotEmpty()
    max_atmosphering_speed: string;

    @IsNotEmpty()
    crew: string;

    @IsNotEmpty()
    passengers: string;

    @IsNotEmpty()
    cargo_capacity: string;

    @IsNotEmpty()
    consumables: string;

    @IsNotEmpty()
    hyperdrive_rating: string;

    @IsNotEmpty()
    MGLT: string;

    @IsNotEmpty()
    starship_class: string;

    @IsNotEmpty()
    created: string;

    @IsNotEmpty()
    edited: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    filmIds: Array<number>

}