import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { PeopleService } from "../people.service";

@Injectable()
export class PeopleExistPipe implements PipeTransform {
  constructor(private readonly peopleService: PeopleService) {}

  async transform(id: number, metadata: ArgumentMetadata) {

    let people = await this.peopleService.findOne(id)

    if(!people) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
  }

}
