import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Image } from "./entities/images.entity";
import { People } from "../swapi/people/entities/people.entity";

import * as AWS from "aws-sdk";

import { config } from "dotenv";

config()

@Injectable()
export class ImagesService {

    private s3: AWS.S3;

    constructor(
        @InjectRepository(Image)
        private readonly imagesRepository: Repository<Image>,
        @InjectRepository(People)
        private readonly peopleRepository: Repository<People>,
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }


    private async getArrayImages(files: Array<Express.Multer.File>) {
        let images_arr = []

        if(files.length != 0) {
            for (let i = 0; i < files.length; i++) {
                const result = await this.s3.upload({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: files[i].originalname,
                    Body: files[i].buffer,
                }).promise();

                images_arr.push({url: result.Location})

            }
        }

        return images_arr;
    }




    async addImages(newPeople, files: Array<Express.Multer.File>) {


        let arrImages = await this.getArrayImages(files);


        let images = await this.imagesRepository
            .createQueryBuilder()
            .insert()
            .into(Image)
            .values(arrImages)
            .execute()


        const relation = await this.imagesRepository
            .createQueryBuilder()
            .relation(People, 'images')
            .of(newPeople.id)
            .add(arrImages);

    }

    async deleteImages(urls) {
        urls.forEach(async (item) => {

            let url = decodeURIComponent(item.url)

            const key = url.split('/').pop(); // get the key (filename) from the URL
            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
            };
            await this.s3.deleteObject(params).promise();

        })
    }

}
