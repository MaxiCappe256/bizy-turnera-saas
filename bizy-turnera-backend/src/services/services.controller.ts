import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @Body() createServiceDto: CreateServiceDto,
    @GetBusiness() businessId: string,
  ) {
    return this.servicesService.create(createServiceDto, businessId);
  }

  @Get()
  findAll(
    @GetBusiness() businessId: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('term') term?: string,
  ) {
    return this.servicesService.findAll(term, businessId, limit, offset);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetBusiness() businessId: string,
  ) {
    return this.servicesService.findOne(id, businessId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @GetBusiness() businessId: string,
  ) {
    return this.servicesService.update(id, updateServiceDto, businessId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetBusiness() businessId: string,
  ) {
    return this.servicesService.remove(id, businessId);
  }
}