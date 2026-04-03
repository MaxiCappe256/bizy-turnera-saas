import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

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
    @Query('pendingPayment') pendingPayment?: string,
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ) {
    let limit: number | undefined;
    let offset: number | undefined;

    if (limitStr !== undefined && limitStr !== '') {
      const n = Number.parseInt(limitStr, 10);
      if (Number.isNaN(n) || n < 1) {
        throw new BadRequestException('limit must be a positive integer');
      }
      limit = n;
    }

    if (offsetStr !== undefined && offsetStr !== '') {
      const n = Number.parseInt(offsetStr, 10);
      if (Number.isNaN(n) || n < 0) {
        throw new BadRequestException('offset must be a non-negative integer');
      }
      offset = n;
    }

    return this.appointmentsService.findAll(businessId, pendingPayment, limit, offset);
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


}
