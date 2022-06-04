import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return await result;
    }
    return null;
  }
  async generateToken(user: any): Promise<any> {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
