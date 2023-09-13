import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(data, avatar) {
    try {
      const { email, password } = data;
      const candidate = await this.userService.findByEmail(email);

      if (candidate)
        throw new HttpException(
          'User with same email is already exist',
          HttpStatus.BAD_REQUEST,
        );
      const hashPass = await bcrypt.hash(
        password,
        Number(process.env.SALT_OR_ROUNDS),
      );

      const user = await this.userService.createUser({
        ...data,
        password: hashPass,
        avatar,
      });
      return this.generateJWT(user);
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      const candidate = await this.userService.findByEmail(email);

      if (!candidate)
        throw new HttpException(
          'User with this email doesn`t exist',
          HttpStatus.BAD_REQUEST,
        );

      const dePass = await bcrypt.compare(password, candidate.password);
      if (!dePass)
        throw new HttpException(
          'Write correct password',
          HttpStatus.BAD_REQUEST,
        );

      return this.generateJWT(candidate);
    } catch (e) {
      throw e;
    }
  }

  generateJWT(user) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
