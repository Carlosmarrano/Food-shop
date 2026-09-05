import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    const existinUser = await this.userRepository.findOneBy({ email });

    if (existinUser) {
      throw new BadRequestException("The email is already registered");
    };

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(password, 10),
    });

    await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ["id", "fullName", "email", "roles", "isActive"],
    });
  };

  async findOne(id: string) {

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found to update`);
    };

    return await this.userRepository.save(user);
  };

  async suspend(id: string) {
    const user = await this.findOne(id);

    user.roles = ["Suspended"];

    return await this.userRepository.save(user);

  };

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`The user with id ${id} to be deleted could not be found.`)
    }

    return { message: `User with id ${id} sucessfully deleted` };
  };
}
