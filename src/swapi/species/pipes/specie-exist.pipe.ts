import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { SpeciesService } from "../species.service";

@Injectable()
export class SpecieExistPipe implements PipeTransform {
  constructor(private readonly speciesService: SpeciesService) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    let specie = await this.speciesService.findOne(id)

    if(!specie) {
      throw new NotFoundException(`Specie with ID ${id} not found`);
    }
  }

}
