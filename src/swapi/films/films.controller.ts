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

import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";

import { Film } from "./entities/film.entity";

import { FilmsService } from "./films.service";

import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { FilmExistPipe } from "./pipes/film-exist.pipe";

@Controller('films')
@UseGuards(AuthGuard)
export class FilmsController {
    constructor(private filmsService: FilmsService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<Film>> {
        limit = limit > 100 ? 100 : limit;

        return this.filmsService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, FilmExistPipe) id) {
        return this.filmsService.findOne(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createFilmDto: CreateFilmDto) {
        return this.filmsService.store(createFilmDto)
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, FilmExistPipe) id) {
        return this.filmsService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, FilmExistPipe) id, @Body() updateFilmDto: UpdateFilmDto) {
        return this.filmsService.update(id, updateFilmDto);
    }

}
