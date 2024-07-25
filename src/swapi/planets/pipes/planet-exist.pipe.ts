import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { PlanetsService } from '../planets.service';

@Injectable()
export class PlanetExistPipe implements PipeTransform {
  constructor(private readonly planetsService: PlanetsService) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    let planet = await this.planetsService.findOne(id)

    if(!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
  }

}