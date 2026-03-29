import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Business } from 'src/business/entities/business.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,

    private readonly jwtService: JwtService,

    private readonly dataSource: DataSource,
  ) { }
  async register(registerDto: RegisterDto) {
    try {
      const { email, password, businessName, ...rest } = registerDto;

      return this.dataSource.transaction(async (manager) => {
        // CREAR BUSINESS
        const business = manager.create(Business, {
          name: businessName,
        });

        await manager.save(business);

        // CREAR USER
        const user = manager.create(User, {
          email,
          password: await bcrypt.hash(password, 10),
          role: Role.admin,
          business,
          ...rest,
        });

        await manager.save(user);

        const {
          password: _,
          business: userBusiness,
          createdAt,
          updatedAt,
          ...userData
        } = user;

        return {
          ...userData,
          businessId: business?.id,
        };
      });
    } catch (error) {
      console.log(error);
      this.handlerErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['business'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.isActive) throw new UnauthorizedException('inactive user');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      businessId: user.business?.id,
      role: user.role,
    };

    const { password: _, business, createdAt, updatedAt, ...rest } = user;

    return {
      ...rest,
      businessId: business?.id,
      token: this.jwtService.sign(payload),
    };
  }

  async getProfile(user: any, businessId: string) {
    const userDB = await this.userRepository.findOne({
      where: {
        id: user.sub,
        business: {
          id: businessId,
        }
      },
      relations: {
        business: true
      }
    })

    if (!userDB) throw new NotFoundException("User not found")

    const { password, business, ...userSafe } = userDB;

    return {
      ...userSafe,
      businessId: business.id
    }
  }

  private handlerErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('Email or slug is already exists');
    }

    console.error(error);
    throw new InternalServerErrorException(
      'Internal server error, contact whit developer',
    );
  }
}
