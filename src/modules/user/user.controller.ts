import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class USerController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUser: UserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUser);
  }
}
