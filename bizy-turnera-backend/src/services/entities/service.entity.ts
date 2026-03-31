import { Appointment } from "src/appointments/entities/appointment.entity";
import { Business } from "src/business/entities/business.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  duration: number;

  @Column('decimal', {
    precision: 10,
    scale: 2
  })
  price: number;

  @ManyToOne(
    () => Business,
    (business) => business.services, {
    onDelete: "CASCADE"
  }
  )
  business: Business

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[]

}
