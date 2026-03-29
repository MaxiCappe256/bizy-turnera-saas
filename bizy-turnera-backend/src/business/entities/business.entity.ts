import { User } from 'src/auth/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;
  // no puede haber 2 empresas con el mismo slug/url
  @Column('text', { unique: true })
  slug: string;

  @Column({ default: 'free' })
  plan: 'free' | 'pro';

  @OneToMany(() => User, (user) => user.business, {
    onDelete: 'CASCADE',
  })

  users: User[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.name.toLowerCase().trim().replace(/\s+/g, '-');
  }

  @OneToMany(() => Client, (client) => client.business)
  client: Client[];

  @OneToMany(
    () => Service,
    (service) => service.business
  )
  services: Service[]
}
