import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod, PaymentStatus } from '../enums/payments.enum';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/auth/entities/user.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Business } from 'src/business/entities/business.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.COMPLETED,
  })
  status: PaymentStatus;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  paidAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  canceledAt?: Date;

  @ManyToOne(() => Business)
  business: Business;

  @OneToOne(() => Appointment)
  @JoinColumn()
  appointment: Appointment;

  @ManyToOne(() => Client, (client) => client.payments)
  client: Client;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
