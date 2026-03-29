import { Controller, Get, Patch, Body } from '@nestjs/common';
import { BusinessService } from './business.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';
import { Business } from './entities/business.entity';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Get()
  findOne(@GetBusiness() business: Business) {
    return this.businessService.findOne(business);
  }

  @Patch()
  update(
    @GetBusiness() business: Business,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(business, updateBusinessDto);
  }

  @Get('plan')
  getPlan(@GetBusiness() business: Business) {
    return this.businessService.getPlan(business);
  }
}