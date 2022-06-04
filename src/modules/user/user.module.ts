import { AuthModule } from '../../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { USerController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [USerController],
  providers: [UserService, UserRepository, JwtService],
})
export class UserModule {}
