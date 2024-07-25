import { IsNotEmpty } from 'class-validator';

export class CreateSpecieDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    classification: string;

    @IsNotEmpty()
    average_height: string;

    @IsNotEmpty()
    skin_colors: string;

    @IsNotEmpty()
    hair_colors: string;

    @IsNotEmpty()
    eye_colors: string;

    @IsNotEmpty()
    average_lifespan: string;

    @IsNotEmpty()
    language: string;

    @IsNotEmpty()
    created: string;

    @IsNotEmpty()
    edited: string

    @IsNotEmpty()
    url: string

    @IsNotEmpty()
    filmIds: Array<number>

}