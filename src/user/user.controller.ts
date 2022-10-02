import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';

import { User } from './user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<string> {
    const users: User[] = await this.userService.findAll();
    return `{result: ${JSON.stringify(users)}}`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    const user: User | null = await this.userService.findOne(id);
    return user ? `{result: ${JSON.stringify(user)}}` : '{result : null}';
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user: User | String = await this.userService.create(createUserDto);
    return `{result: ${JSON.stringify(user)}}`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDto) {
    await this.userService.update(id, updateUserDTO);
    return `Update ${id} `;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    await this.userService.remove(id);
    return `Delete user#${id}`;
  }

  @Put('password/:id')
  async async(
    @Param('id') id: string,
    @Body() updateUserPasswordDTO: UpdateUserPasswordDto,
  ): Promise<string> {
    const result: string = await this.userService.updatePassword(
      id,
      updateUserPasswordDTO,
    );
    return `{result: "${result}"}`;
  }
}
