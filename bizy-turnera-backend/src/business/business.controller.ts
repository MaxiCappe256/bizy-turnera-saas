import { Controller, Get, Patch, Body } from '@nestjs/common';
import { BusinessService } from './business.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';
import { Business } from './entities/business.entity';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  findOne(@GetBusiness() businessId: string) {
    return this.businessService.findOne(businessId);
  }

  @Patch()
  update(
    @GetBusiness() businessId: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(businessId, updateBusinessDto);
  }

  @Get('plan')
  getPlan(@GetBusiness() businessId: string) {
    return this.businessService.getPlan(businessId);
  }
}
