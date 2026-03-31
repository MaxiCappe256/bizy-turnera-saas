import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  serviceId: string;

  @IsUUID()
  userId: string;

  @IsDateString()
  startAt: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
