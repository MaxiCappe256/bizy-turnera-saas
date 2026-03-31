import { Business } from 'src/business/entities/business.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  fullName: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', {
    default: Role.admin,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Business, (business) => business.users, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];


  @BeforeInsert()
  @BeforeUpdate()
  valdiateEmail() {
    this.email = this.email.toLowerCase().trim();
  }
}
