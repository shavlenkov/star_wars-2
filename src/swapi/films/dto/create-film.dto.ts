import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFilmDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    episode_id: number;

    @IsNotEmpty()
    opening_crawl: string;

    @IsNotEmpty()
    director: string;

    @IsNotEmpty()
    producer: string;

    @IsNotEmpty()
    release_date: string;

    @IsNotEmpty()
    created: string;

    @IsNotEmpty()
    edited: string;

    @IsNotEmpty()
    url: string;

}