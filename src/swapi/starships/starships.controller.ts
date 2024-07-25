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

import { Starship } from "./entities/starship.entity";

import { StarshipsService } from "./starships.service";

import { CreateStarshipDto } from "./dto/create-starship.dto";
import { UpdateStarshipDto } from "./dto/update-starship.dto";

import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { StarshipExistPipe } from "./pipes/starship-exist.pipe";

@Controller('starships')
@UseGuards(AuthGuard)
export class StarshipsController {
    constructor(private starshipsService: StarshipsService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<Starship>> {
        limit = limit > 100 ? 100 : limit;

        return this.starshipsService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, StarshipExistPipe) id) {
        return this.starshipsService.findOne(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createStarshipDto: CreateStarshipDto) {
        return this.starshipsService.store(createStarshipDto)
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, StarshipExistPipe) id) {
        return this.starshipsService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, StarshipExistPipe) id, @Body() updateStarshipDto: UpdateStarshipDto) {
        return this.starshipsService.update(id, updateStarshipDto);
    }

}
