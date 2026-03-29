import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Business } from 'src/business/entities/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Business])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
