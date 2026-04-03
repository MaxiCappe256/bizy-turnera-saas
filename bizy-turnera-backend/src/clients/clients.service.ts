import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Business } from 'src/business/entities/business.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createClientDto: CreateClientDto, businessId: string) {
    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });

    if (!business) throw new NotFoundException('Business not found');

    const client = this.clientRepository.create({
      ...createClientDto,
      business,
    });

    return this.clientRepository.save(client);
  }

  async findAll(
    term: string | undefined,
    businessId: string,
    limit: number,
    offset: number,
  ) {
    if (term) {
      return this.clientRepository.find({
        where: {
          fullName: ILike(`%${term}%`),
          business: { id: businessId },
        },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
      });
    }

    return this.clientRepository.find({
      where: {
        business: { id: businessId },
      },
      order: { fullName: 'ASC' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string, businessId: string) {
    const client = await this.clientRepository.findOne({
      where: { id, business: { id: businessId } },
    });

    if (!client) throw new NotFoundException('Client not found');

    return client;
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
    businessId: string,
  ) {
    const client = await this.findOne(id, businessId);

    Object.assign(client, updateClientDto);

    return this.clientRepository.save(client);
  }

  async remove(id: string, businessId: string) {
    const client = await this.findOne(id, businessId);

    await this.clientRepository.remove(client);

    return 'Client deleted successfully';
  }
}
