import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdminUserDto } from './dto/create-admin-user-dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

  ) { }

  async create(createAdminUserDto: CreateAdminUserDto) {
    const { name, email, role } = createAdminUserDto;

    const existinUser = await this.userRepository.findOneBy({ email });

    if (existinUser) {
      throw new BadRequestException("The email is already registered");
    };

    const tempPassword = "Password123!";
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = this.userRepository.create({
      fullName: name,
      email,
      roles: [role ?? "USER"],
      password: hashedPassword,
    })

    const savedUser = await this.userRepository.save(newUser);

    delete savedUser.password;
    return savedUser;
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
