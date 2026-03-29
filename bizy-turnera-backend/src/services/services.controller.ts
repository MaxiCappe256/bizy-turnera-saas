import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';
import { Business } from 'src/business/entities/business.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @GetBusiness() business: Business) {
    return this.servicesService.create(createServiceDto, business);
  }

  @Get()
  findAll(
    @GetBusiness() business: Business,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('term') term?: string,) {
    return this.servicesService.findAll(term, business, limit, offset);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetBusiness() business: Business) {
    return this.servicesService.findOne(id, business);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateServiceDto: UpdateServiceDto, @GetBusiness() business: Business) {
    return this.servicesService.update(id, updateServiceDto, business);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetBusiness() business: Business) {
    return this.servicesService.remove(id, business);
  }
}
