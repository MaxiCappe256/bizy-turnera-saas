import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBusiness } from 'src/auth/decorators/get-business.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('stats')
  getStats(@GetBusiness() businessId: string) {
    return this.paymentsService.getStats(businessId)
  }

  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @GetBusiness() businessId: string,
  ) {
    return this.paymentsService.create(createPaymentDto, businessId);
  }

  @Get()
  findAll(
    @GetBusiness() businessId: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('offset', ParseIntPipe) offset?: number,
  ) {
    return this.paymentsService.findAll(businessId, limit, offset);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @GetBusiness() businessId: string) {
    return this.paymentsService.cancel(id, businessId);
  }

  // @Get(':id')
  // findOne(
  //   @Param('id') id: string,
  //   @GetBusiness() businessId: string,
  // ) {
  //   return this.paymentsService.findOne(id, businessId);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePaymentDto: UpdatePaymentDto,
  //   @GetBusiness() businessId: string,
  // ) {
  //   return this.paymentsService.update(id, updatePaymentDto, businessId);
  // }

  // @Delete(':id')
  //   remove(
  //   @Param('id') id: string,
  //   @GetBusiness() businessId: string,
  // ) {
  //   return this.paymentsService.remove(id, businessId);
  // }
}
