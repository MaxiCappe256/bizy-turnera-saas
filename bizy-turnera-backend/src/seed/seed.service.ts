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

    return 'Seed ejecutado correctamente';
  }

  private async cleanDB() {
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
