import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetBusiness() businessId: string,
  ) {
    return this.appointmentsService.create(createAppointmentDto, businessId);
  }

  @Get()
  findAll(
    @GetBusiness() businessId: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('offset', ParseIntPipe) offset?: number,
  ) {
    return this.appointmentsService.findAll(businessId, limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetBusiness() businessId: string) {
    return this.appointmentsService.findOne(id, businessId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @GetBusiness() businessId: string,
  ) {
    return this.appointmentsService.update(
      id,
      updateAppointmentDto,
      businessId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetBusiness() businessId: string) {
    return this.appointmentsService.remove(id, businessId);
  }
}
