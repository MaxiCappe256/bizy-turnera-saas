import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ILike, Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { Service } from "./entities/service.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto, businessId: string) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      business: { id: businessId },
    });

    return this.serviceRepository.save(service);
  }

  async findAll(
    term: string | undefined,
    businessId: string,
    limit: number,
    offset: number,
  ) {
    if (term) {
      return this.serviceRepository.find({
        where: {
          name: ILike(`%${term}%`),
          business: { id: businessId },
        },
        order: { name: 'ASC' },
        take: limit,
        skip: offset,
      });
    }

    return this.serviceRepository.find({
      where: { business: { id: businessId } },
      order: { name: 'ASC' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string, businessId: string) {
    const service = await this.serviceRepository.findOne({
      where: { id, business: { id: businessId } },
    });

    if (!service) throw new NotFoundException('Service not found');

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    businessId: string,
  ) {
    const service = await this.findOne(id, businessId);

    Object.assign(service, updateServiceDto);

    return this.serviceRepository.save(service);
  }

  async remove(id: string, businessId: string) {
    const service = await this.findOne(id, businessId);

    await this.serviceRepository.remove(service);

    return 'Service deleted successfully';
  }
}