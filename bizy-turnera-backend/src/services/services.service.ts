import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Business } from 'src/business/entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) { }

  create(createServiceDto: CreateServiceDto, business: Business) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      business
    })

    return this.serviceRepository.save(service)
  }

  async findAll(term: string | undefined, business: Business, limit: number, offset: number) {
    if (term) {
      return this.serviceRepository.find({
        where: {
          name: ILike(`%${term}%`),
          business: { id: business.id }
        },
        order: {
          name: "ASC"
        },
        take: limit,
        skip: offset,
      })
    }

    return this.serviceRepository.find({
      where: {
        business: { id: business.id }
      },
      order: {
        name: "ASC"
      },
      take: limit,
      skip: offset,
    })
  }

  async findOne(id: string, business: Business) {
    const service = await this.serviceRepository.findOne({ where: { id, business: { id: business.id } } })

    if (!service) throw new NotFoundException('Service not found')

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, business: Business) {

    const service = await this.findOne(id, business)

    Object.assign(service, updateServiceDto)

    return await this.serviceRepository.save(service)
  }

  async remove(id: string, business: Business) {
    const service = await this.findOne(id, business)

    await this.serviceRepository.remove(service)

    return "Service deleted susccessfuly"
  }
}
