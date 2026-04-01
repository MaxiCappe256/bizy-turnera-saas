import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/business/entities/business.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/auth/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Business,
      Client,
      User,
      Service,
      Appointment,
      Payment,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
