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

import { Vehicle } from "./entities/vehicle.entity";

import { VehiclesService } from "./vehicles.service";

import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

import { CommonInterceptor } from "../../interceptors/common.interceptor";

import { AuthGuard } from "../../auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";
import { UserGuard } from "../../guards/user/user.guard";

import { VehicleExistPipe } from "./pipes/vehicle-exist.pipe";

@Controller('vehicles')
@UseGuards(AuthGuard)
export class VehiclesController {
    constructor(private vehiclesService: VehiclesService) {}

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(CommonInterceptor)
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10 ): Promise<Pagination<Vehicle>> {
        limit = limit > 100 ? 100 : limit;

        return this.vehiclesService.paginate({page, limit});
    }

    @Get('/:id')
    @UseGuards(UserGuard)
    show(@Param('id', ParseIntPipe, VehicleExistPipe) id) {
        return this.vehiclesService.findOne(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.store(createVehicleDto)
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    remove(@Param('id', ParseIntPipe, VehicleExistPipe) id) {
        return this.vehiclesService.delete(id);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    edit(@Param('id', ParseIntPipe, VehicleExistPipe) id, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto);
    }

}
