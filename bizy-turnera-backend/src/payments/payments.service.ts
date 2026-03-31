import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/auth/entities/user.entity';

import { Business } from 'src/business/entities/business.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, businessId: string) {
    const { appointmentId, method } = createPaymentDto;

    return await this.paymentRepository.manager.transaction(async (manager) => {
      const appointment = await manager.findOne(Appointment, {
        where: {
          id: appointmentId,
          business: {
            id: businessId,
          },
        },
        relations: {
          client: true,
          service: true,
          user: true,
          business: true,
        },
      });

      if (!appointment) throw new NotFoundException('Appointment not found');

      const existingPayment = await manager.findOne(Payment, {
        where: {
          appointment: {
            id: appointmentId,
          },
        },
      });

      if (existingPayment)
        throw new ConflictException('Payment already exists');

      appointment.client.debt -= appointment.service.price;
      await manager.save(appointment.client);

      const payment = manager.create(Payment, {
        appointment,
        method,
        amount: appointment.service.price,
        description: `Pago de la cita ${appointment.service.name}`,
        business: appointment.business,
        client: appointment.client,
        user: appointment.user,
        paidAt: new Date(),
      });

      return manager.save(payment);
    });
  }

  findAll(
    businessId: string,
    parsedLimit: number | undefined,
    parsedOffset: number | undefined,
  ) {
    return `This action returns all payments`;
  }

  findOne(id: string, businessId: string) {
    return `This action returns a #${id} payment`;
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto, businessId: string) {
    return `This action updates a #${id} payment`;
  }

  remove(id: string, businessId: string) {
    return `This action removes a #${id} payment`;
  }
}
