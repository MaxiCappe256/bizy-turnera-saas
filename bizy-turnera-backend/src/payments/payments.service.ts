import {
  BadRequestException,
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
import { PaymentMethod, PaymentStatus } from './enums/payments.enum';
import { AppointmentStatus } from 'src/appointments/enums/appointment-status.enum';

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
  ) { }

  async getStats(businessId: string) {
    const payments = await this.paymentRepository.find({
      where: {
        business: { id: businessId },
        status: PaymentStatus.COMPLETED,
      },
    });

    const cashPayments = payments.filter(
      (payment) => payment.method === PaymentMethod.CASH,
    );

    const transferPayments = payments.filter(
      (payment) => payment.method === PaymentMethod.TRANSFER,
    );

    const total = payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    const cash = cashPayments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    const transfer = transferPayments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    return {
      total,
      cash,
      transfer,
    };
  }

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

      if (appointment.status === AppointmentStatus.CANCELED) throw new BadRequestException("Cannot pay a canceled appointment")

      const existingPayment = await manager.findOne(Payment, {
        where: {
          appointment: {
            id: appointmentId,
          },
        },
      });

      if (existingPayment)
        throw new ConflictException('Payment already exists');

      if (appointment.status !== AppointmentStatus.COMPLETED) {
        appointment.status = AppointmentStatus.COMPLETED
      }

      appointment.client.debt -= appointment.service.price;

      await manager.save(appointment)
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
    limit: number | undefined,
    offset: number | undefined,
  ) {
    return this.paymentRepository.find({
      where: {
        business: { id: businessId },
      },
      relations: {
        user: true,
        appointment: true,
        client: true,
      },
      order: {
        paidAt: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  async cancel(id: string, businessId: string) {
    return this.paymentRepository.manager.transaction(async (manager) => {
      const payment = await manager.findOne(Payment, {
        where: { id, business: { id: businessId } },
        relations: {
          client: true,
        },
      });

      if (!payment) throw new NotFoundException('Payment not found');

      if (payment.status === PaymentStatus.CANCELED)
        throw new BadRequestException('Payment has already canceled');

      payment.client.debt += payment.amount;

      await manager.save(payment.client);

      payment.status = PaymentStatus.CANCELED;
      payment.canceledAt = new Date();

      return manager.save(payment);
    });
  }

  // findOne(id: string, businessId: string) {
  //   return `This action returns a #${id} payment`;
  // }

  // update(id: string, updatePaymentDto: UpdatePaymentDto, businessId: string) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: string, businessId: string) {
  //   return `This action removes a #${id} payment`;
  // }
}
