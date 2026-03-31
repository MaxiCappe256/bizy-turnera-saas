import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async findOne(businessId: string) {
    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });

    if (!business) throw new NotFoundException('Business not found');

    return business;
  }

  async getPlan(businessId: string) {
    const business = await this.findOne(businessId);

    return { plan: business.plan };
  }

  async update(businessId: string, updateBusinessDto: UpdateBusinessDto) {
    const business = await this.findOne(businessId);

    Object.assign(business, updateBusinessDto);

    return this.businessRepository.save(business);
  }
}
