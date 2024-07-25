import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { Pagination } from "nestjs-typeorm-paginate";

import { Specie } from "./entities/specie.entity";

import { CreateSpecieDto } from "./dto/create-specie.dto";
import { UpdateSpecieDto } from "./dto/update-specie.dto";

import { SpeciesService } from "./species.service";

import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { SpecieExistPipe } from "./pipes/specie-exist.pipe";

@Controller('species')
@UseGuards(AuthGuard)
export class SpeciesController {
    constructor(private speciesService: SpeciesService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<Specie>> {
        limit = limit > 100 ? 100 : limit;

        return this.speciesService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, SpecieExistPipe) id) {
        return this.speciesService.findOne(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createSpecieDto: CreateSpecieDto) {
        return this.speciesService.store(createSpecieDto)
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, SpecieExistPipe) id) {
        return this.speciesService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, SpecieExistPipe) id, @Body() updateSpecieDto: UpdateSpecieDto) {
        return this.speciesService.update(id, updateSpecieDto);
    }

}