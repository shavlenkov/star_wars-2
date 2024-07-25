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
    UploadedFiles,
    UseGuards,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { Pagination } from "nestjs-typeorm-paginate";

import { People } from "./entities/people.entity";

import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";

import { PeopleService } from "./people.service";
import { ImagesService } from "../../images/images.service";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { PeopleExistPipe } from "./pipes/people-exist.pipe";

@Controller('people')
@UseGuards(AuthGuard)
export class PeopleController {
    constructor(private peopleService: PeopleService, private imagesService: ImagesService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<People>> {
        limit = limit > 100 ? 100 : limit;

        return this.peopleService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, PeopleExistPipe) id) {
        return this.peopleService.findOne(id)
    }

    @Post('/')
    @UseGuards(UserGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() createPeopleDto: CreatePeopleDto, @UploadedFiles() files: Array<Express.Multer.File>) {

        let newPeople = await this.peopleService.store(createPeopleDto);

        await this.imagesService.addImages(newPeople, files);

    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, PeopleExistPipe) id) {
        return this.peopleService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, PeopleExistPipe) id, @Body() updatePeopleDto: UpdatePeopleDto) {
        return this.peopleService.update(id, updatePeopleDto);
    }

}