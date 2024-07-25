import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { VehiclesService } from "../vehicles.service";

@Injectable()
export class VehicleExistPipe implements PipeTransform {
  constructor(private readonly vehicleService: VehiclesService) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    let vehicle = await this.vehicleService.findOne(id)

    if(!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }

}
