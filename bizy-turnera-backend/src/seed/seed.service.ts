import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Business } from 'src/business/entities/business.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { initialData } from './initial-data';
import * as bcrypt from 'bcrypt';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentStatus } from 'src/payments/enums/payments.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async executeSeed() {
    await this.cleanDB();

    // Businesses
    const businesses = await this.businessRepository.save(
      initialData.businesses,
    );

    // Users
    for (const user of initialData.users) {
      const business = businesses.find((b) => b.slug === user.businessSlug);

      await this.userRepository.save({
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        fullName: user.fullName,
        role: user.role,
        business,
      });
    }

    // Clients
    for (const client of initialData.clients) {
      const business = businesses.find((b) => b.slug === client.businessSlug);

      await this.clientRepository.save({
        fullName: client.fullName,
        phone: client.phone,
        business,
      });
    }

    // Services
    for (const service of initialData.services) {
      const business = businesses.find((b) => b.slug === service.businessSlug);

      await this.serviceRepository.save({
        name: service.name,
        price: service.price,
        duration: service.duration,
        business,
      });
    }

    // Appointments
    for (const appointment of initialData.appointments) {
      const business = businesses.find(
        (b) => b.slug === appointment.businessSlug,
      );

      const client = await this.clientRepository.findOne({
        where: { fullName: appointment.clientName },
      });

      const user = await this.userRepository.findOne({
        where: { email: appointment.userEmail },
      });

      const service = await this.serviceRepository.findOne({
        where: { name: appointment.serviceName },
      });

      await this.appointmentRepository.save({
        startAt: appointment.startAt,
        endAt: appointment.endAt,
        status: appointment.status,
        business,
        client,
        user,
        service,
      } as Appointment);
    }

    // Payments (misma lógica de deuda que PaymentsService.create solo si status COMPLETED)
    for (const paymentSeed of initialData.payments) {
      const business = businesses.find(
        (b) => b.slug === paymentSeed.businessSlug,
      );
      if (!business) continue;

      const appointment = await this.findAppointmentForPaymentSeed(
        business.id,
        paymentSeed,
      );

      if (!appointment) {
        throw new Error(
          `Seed: no se encontró la cita para el pago (${paymentSeed.clientName}, ${paymentSeed.serviceName})`,
        );
      }

      const existingPayment = await this.paymentRepository.findOne({
        where: { appointment: { id: appointment.id } },
      });
      if (existingPayment) continue;

      const amount = Number(appointment.service.price);

      if (paymentSeed.status === PaymentStatus.COMPLETED) {
        appointment.client.debt -= amount;
        await this.clientRepository.save(appointment.client);
      }

      await this.paymentRepository.save({
        amount,
        method: paymentSeed.method,
        status: paymentSeed.status,
        description: paymentSeed.description,
        paidAt: paymentSeed.paidAt,
        canceledAt:
          paymentSeed.status === PaymentStatus.CANCELED
            ? paymentSeed.canceledAt
            : undefined,
        business: appointment.business,
        appointment,
        client: appointment.client,
        user: appointment.user,
      } as Payment);
    }

    return 'Seed ejecutado correctamente';
  }

  private async findAppointmentForPaymentSeed(
    businessId: string,
    paymentSeed: (typeof initialData.payments)[number],
  ): Promise<Appointment | null> {
    const appointments = await this.appointmentRepository.find({
      where: { business: { id: businessId } },
      relations: {
        client: true,
        user: true,
        service: true,
        business: true,
      },
    });

    return (
      appointments.find(
        (a) =>
          a.client.fullName === paymentSeed.clientName &&
          a.user.email === paymentSeed.userEmail &&
          a.service.name === paymentSeed.serviceName &&
          Math.abs(a.startAt.getTime() - paymentSeed.startAt.getTime()) < 2000,
      ) ?? null
    );
  }

  private async cleanDB() {
    await this.paymentRepository.query(
      `TRUNCATE TABLE "payment" RESTART IDENTITY CASCADE`,
    );

    await this.appointmentRepository.query(
      `TRUNCATE TABLE "appointment" RESTART IDENTITY CASCADE`,
    );

    await this.clientRepository.query(
      `TRUNCATE TABLE "client" RESTART IDENTITY CASCADE`,
    );

    await this.serviceRepository.query(
      `TRUNCATE TABLE "service" RESTART IDENTITY CASCADE`,
    );

    await this.userRepository.query(
      `TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`,
    );

    await this.businessRepository.query(
      `TRUNCATE TABLE "business" RESTART IDENTITY CASCADE`,
    );
  }
}
