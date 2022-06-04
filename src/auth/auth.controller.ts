import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const hashPassword = bcrypt.hash(password, 12);
      const userData = await this.userService.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: await hashPassword,
      });

      const formatData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
      };

      const jwtService = await new JwtService({
        secret: this.configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '2m',
        },
      });

      const token = jwtService.sign({
        email,
      });
      return {
        message: 'succes',
        user: formatData,
        token: token,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new BadRequestException('Invalide credentials');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalide credentials');
      }

      const jwtService = await new JwtService({
        secret: this.configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '2m',
        },
      });
      const token = jwtService.sign({
        name: user.firstName,
        sub: user._id,
      });

      const formatData = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      };

      return {
        user: formatData,
        accessTokenUser: token,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }
}
