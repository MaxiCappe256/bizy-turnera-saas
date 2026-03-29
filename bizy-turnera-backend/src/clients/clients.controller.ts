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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';
import { Business } from 'src/business/entities/business.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('clients')

export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(
    @Body() createClientDto: CreateClientDto,
    @GetBusiness() businessId: string,
  ) {
    return this.clientsService.create(createClientDto, businessId);
  }

  @Get()
  findAll(
    @GetBusiness() business: Business,
    @Query('term') term?: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,) {
    return this.clientsService.findAll(term, business, limit, offset);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetBusiness() business: Business,
  ) {
    return this.clientsService.findOne(id, business);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
    @GetBusiness() business: Business,
  ) {
    return this.clientsService.update(id, updateClientDto, business);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetBusiness() business: Business,
  ) {
    return this.clientsService.remove(id, business);
  }
}
