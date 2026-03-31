import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/auth/entities/user.entity';
import { addMinutes } from 'date-fns';
import { AppointmentStatus } from './enums/appointment-status.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, businessId: string) {
    const { clientId, serviceId, userId, startAt, notes } =
      createAppointmentDto;

    const client = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
    });

    if (!client) throw new NotFoundException('Client not found');

    const service = await this.serviceRepository.findOne({
      where: {
        id: serviceId,
      },
    });

    if (!service) throw new NotFoundException('Service not found');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const startDate = new Date(startAt);

    const endDate = addMinutes(startDate, service.duration);

    const overlapping = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.userId = :userId', { userId })
      .andWhere('appointment.startAt < :endAt', { endAt: endDate })
      .andWhere('appointment.endAt > :startAt', { startAt: startDate })
      .getOne();

    if (overlapping)
      throw new BadRequestException('This time slot is already booked');

    const appointment = this.appointmentRepository.create({
      startAt: startDate,
      endAt: endDate,
      notes,
      status: AppointmentStatus.PENDING,
      business: { id: businessId },
      client,
      user,
      service,
    });

    return this.appointmentRepository.save(appointment);
  }

  findAll(businessId: string, limit?: number, offset?: number) {
    return this.appointmentRepository.find({
      where: {
        business: { id: businessId },
      },
      relations: {
        client: true,
        service: true,
        user: true,
      },
      order: {
        startAt: 'ASC',
      },
      ...(typeof limit === 'number' && Number.isFinite(limit)
        ? { take: limit }
        : {}),
      ...(typeof offset === 'number' && Number.isFinite(offset)
        ? { skip: offset }
        : {}),
    });
  }

  async findOne(id: string, businessId: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: {
        id,
        business: { id: businessId },
      },

      relations: {
        client: true,
        service: true,
        user: true,
      },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    businessId: string,
  ) {
    const appointment = await this.findOne(id, businessId);

    let client: Client | null = appointment.client;
    let service: Service | null = appointment.service;
    let user: User | null = appointment.user;

    if (updateAppointmentDto.clientId) {
      client = await this.clientRepository.findOne({
        where: { id: updateAppointmentDto.clientId },
      });

      if (!client) throw new NotFoundException('Client not found');
    }

    if (updateAppointmentDto.serviceId) {
      service = await this.serviceRepository.findOne({
        where: { id: updateAppointmentDto.serviceId },
      });

      if (!service) throw new NotFoundException('Service not found');
    }

    if (updateAppointmentDto.userId) {
      user = await this.userRepository.findOne({
        where: { id: updateAppointmentDto.userId },
      });

      if (!user) throw new NotFoundException('User not found');
    }

    let startDate = appointment.startAt;

    if (updateAppointmentDto.startAt) {
      startDate = new Date(updateAppointmentDto.startAt);
    }

    const endDate = addMinutes(startDate, service.duration);

    const overlapping = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.userId = :userId', { userId: user.id })
      .andWhere('appointment.id != :id', { id })
      .andWhere('appointment.businessId = :businessId', { businessId })
      .andWhere('appointment.startAt < :endAt', { endAt: endDate })
      .andWhere('appointment.endAt > :startAt', { startAt: startDate })
      .getOne();

    if (overlapping)
      throw new BadRequestException('This time slot is already booked');

    appointment.startAt = startDate;
    appointment.endAt = endDate;
    appointment.client = client || appointment.client;
    appointment.service = service || appointment.service;
    appointment.user = user || appointment.user;
    if (updateAppointmentDto.status) {
      appointment.status = updateAppointmentDto.status;
    }

    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string, businessId: string) {
    const appointment = await this.findOne(id, businessId);

    await this.appointmentRepository.remove(appointment);

    return 'Appointment deleted successfully';
  }
}
