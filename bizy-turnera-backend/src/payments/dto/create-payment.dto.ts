import { IsEnum, IsUUID } from 'class-validator';
import { PaymentMethod } from '../enums/payments.enum';

export class CreatePaymentDto {
  @IsUUID()
  appointmentId: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
