import { User } from './schemas/user.schema';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: any) {
    return this.userRepository.createUser(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }
  async getUser(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }

  async updateUser(userId: string, newUserDtat: UserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, newUserDtat);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }
}
