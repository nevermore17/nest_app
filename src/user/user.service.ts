import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm/browser';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update({ id: id }, { ...updateUserDTO });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({ ...createUserDto });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updatePassword(
    id: string,
    updateUserPasswordDTO: UpdateUserPasswordDto,
  ): Promise<string> {
    const user: User | null = await this.usersRepository.findOneBy({ id });
    if (user && user.password == updateUserPasswordDTO.oldPassWord) {
      await this.usersRepository.update(
        { id: id },
        { password: updateUserPasswordDTO.newPassWord },
      );
      return '[SUCCESS] Password was changed';
    } else if (!user) return '[SERVER ERROR] User is not exist';
    else return '[ACCESS DENIED] Uncorrected old password';
  }
}
