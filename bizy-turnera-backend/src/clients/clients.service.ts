import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ILike, Repository } from 'typeorm';
import { Business } from 'src/business/entities/business.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) { }

  async create(createClientDto: CreateClientDto, businessId: string) {
    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });

    if (!business) throw new NotFoundException('Business not found');

    const client = this.clientRepository.create({
      ...createClientDto,
      business,
    });

    return await this.clientRepository.save(client)
  }

  async findAll(term: string | undefined, business: Business, limit: number, offset: number) {
    if (term) {
      return this.clientRepository.find({
        where: {
          fullName: ILike(`%${term}%`),
          business: { id: business.id }
        },
        order: {
          fullName: "ASC"
        },
        take: limit,
        skip: offset,
      })
    }

    return this.clientRepository.find({
      where: {
        business: { id: business.id }
      },
      order: {
        fullName: "ASC"
      },
      take: limit,
      skip: offset,
    })

  }

  async findOne(id: string, business: Business) {
    const client = await this.clientRepository.findOne({ where: { id, business: { id: business.id } } })

    if (!client) throw new NotFoundException("Client not found")

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, business: Business) {
    const client = await this.findOne(id, business)

    Object.assign(client, updateClientDto)

    return await this.clientRepository.save(client)
  }

  async remove(id: string, business: Business) {
    const client = await this.findOne(id, business)

    await this.clientRepository.remove(client)

    return "Client deleted successfuly"
  }
}
