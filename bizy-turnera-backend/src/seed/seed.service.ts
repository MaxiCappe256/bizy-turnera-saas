import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Business } from 'src/business/entities/business.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { initialData } from './initial-data';
import * as bcrypt from 'bcrypt';
import { Service } from 'src/services/entities/service.entity';

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
  ) { }

  async executedSeed() {
    // limpiar la base de datos
    await this.cleanDB();

    // guardar todos los business
    const businesses = await this.businessRepository.save(
      initialData.businesses,
    );

    // guardar todos los usuarios
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

    // guardar los clientes
    for (const client of initialData.clients) {
      const business = businesses.find((b) => b.slug === client.businessSlug);

      await this.clientRepository.save({
        fullName: client.fullName,
        phone: client.phone,
        business,
      });
    }

    // guardar los servicios
    for (const service of initialData.services) {
      const business = businesses.find((b) => b.slug === service.businessSlug);

      await this.serviceRepository.save({
        name: service.name,
        price: service.price,
        duration: service.duration,
        business,
      });
    }

    return 'seed ejecutado';
  }

  private async cleanDB() {
    await this.clientRepository.query(
      `TRUNCATE TABLE "client" RESTART IDENTITY CASCADE`,
    );

    await this.userRepository.query(
      `TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`,
    );

    await this.businessRepository.query(
      `TRUNCATE TABLE "business" RESTART IDENTITY CASCADE`,
    );

    await this.serviceRepository.query(
      `TRUNCATE TABLE "service" RESTART IDENTITY CASCADE`,
    );
  }
}
