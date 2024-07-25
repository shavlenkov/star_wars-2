import {ArgumentMetadata, Injectable, NotFoundException, PipeTransform} from '@nestjs/common';

import {StarshipsService} from "../starships.service";

@Injectable()
export class StarshipExistPipe implements PipeTransform {
  constructor(private readonly starshipsService: StarshipsService) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    let starship = await this.starshipsService.findOne(id)

    if(!starship) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
  }

}
