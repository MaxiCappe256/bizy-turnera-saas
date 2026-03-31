import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { Business } from 'src/business/entities/business.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/auth/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Business, (business) => business.appointments)
  business: Business;

  @ManyToOne(() => Client, (client) => client.appointments, {
    eager: true,
  })
  client: Client;

  @ManyToOne(() => User, (user) => user.appointments, {
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => Service, (service) => service.appointments, {
    eager: true,
    onDelete: 'SET NULL',
  })
  service: Service;

  @OneToMany(() => Payment, (payment) => payment.appointment, {
    cascade: true,
  })
  payments?: Payment[];
}
