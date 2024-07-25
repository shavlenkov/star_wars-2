import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    Query,
    Patch,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';


import { Pagination } from "nestjs-typeorm-paginate";

import { Planet } from "./entities/planet.entity";

import { CreatePlanetDto } from "./dto/create-planet.dto";
import { UpdatePlanetDto } from "./dto/update-planet.dto";

import { PlanetsService } from "./planets.service";

import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { PlanetExistPipe } from "./pipes/planet-exist.pipe";

@Controller('planets')
@UseGuards(AuthGuard)
export class PlanetsController {
    constructor(private planetsService: PlanetsService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<Planet>> {
        limit = limit > 100 ? 100 : limit;

        return this.planetsService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, PlanetExistPipe) id) {
        return this.planetsService.findOne(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createPlanetDto: CreatePlanetDto) {
        return this.planetsService.store(createPlanetDto)
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, PlanetExistPipe) id) {
        return this.planetsService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, PlanetExistPipe) id, @Body() updatePlanetDto: UpdatePlanetDto) {
        return this.planetsService.update(id, updatePlanetDto);
    }

}