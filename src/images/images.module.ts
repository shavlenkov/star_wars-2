import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { ImagesService } from "./images.service";

import { Image } from "./entities/images.entity";
import { People } from "../swapi/people/entities/people.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Image, People])],
    providers: [ImagesService],
    exports: [ImagesService]
})
export class ImagesModule {}
