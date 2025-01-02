import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (foundUser) {
      throw new NotFoundException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return plainToInstance(User, user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return plainToInstance(User, users);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    if (req.user.id === id && updateUserDto.role) {
      throw new ForbiddenException('You cannot edit your role');
    }

    await this.findOne(id);

    const updatedUser = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return plainToInstance(User, updatedUser.raw[0]);
  }

  async remove(id: number, @Request() req): Promise<void> {
    if (req.user.id === id) {
      throw new ForbiddenException('You cannot delete yourself');
    }

    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
