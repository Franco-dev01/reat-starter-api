import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from './../user/schemas/user.schema';
import { UserRepository } from './../user/user.repository';
import { UserService } from './../user/user.service';
import { jwtConfig } from './../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync(jwtConfig),
    PassportModule,
  ],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    JwtService,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
