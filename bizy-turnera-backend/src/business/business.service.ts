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
  ) { }

  async findOne(business: Business) {

    const businessDB = await this.businessRepository.findOne({
      where: { id: business.id },
    });

    if (!businessDB) {
      throw new NotFoundException('Business not found');
    }

    return businessDB;
  }

  async getPlan(business: Business) {

    const businessDB = await this.findOne(business);

    return {
      plan: businessDB.plan,
    };
  }

  async update(business: Business, updateBusinessDto: UpdateBusinessDto) {

    const businessDB = await this.findOne(business);

    Object.assign(businessDB, updateBusinessDto);

    return this.businessRepository.save(businessDB);
  }
}