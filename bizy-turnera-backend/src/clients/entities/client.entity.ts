import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Business } from 'src/business/entities/business.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { nullable: true })
  phone?: string | null;

  @Column('numeric', { default: 0 })
  debt: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Business, (business) => business.client, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[]

  @OneToMany(() => Payment, (payment) => payment.client, {
    cascade: true,
  })
  payments?: Payment[];
}
