import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JwtRefreshToken,
  RefreshTokenDocument,
} from '../model/refresh-token.model';
import appEnv from '../../../config/env.configuration';
import { AccessTokenJwtData } from '../dto/auth.types';
import { UserDTO } from 'src/module/user/dto/user.dto';
import { UserService } from 'src/module/user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  /**
   * time to expire in seconds
   */
  private refreshTokenExpire: number;
  private accessTokenExpire: number;

  constructor(
    @InjectModel(JwtRefreshToken.name)
    private readonly refreshToken: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  makeJwtToken(tokenData: any) {
    console.log('jwt token expire in', appEnv().jwt.JWT_TOKEN_EXPIRE_IN);
    return this.jwtService.sign(tokenData, {
      expiresIn: appEnv().jwt.JWT_TOKEN_EXPIRE_IN,
    });
  }

  makeJwtRefreshToken(tokenData: any) {
    return this.jwtService.sign(tokenData, {
      expiresIn: appEnv().jwt.JWT_REFRESH_TOKEN_EXPIRE_IN,
    });
  }

  async makeToken(user: UserDTO) {
    const tokenData: AccessTokenJwtData = {
      uid: user._id.toString(),
    };

    const token = this.makeJwtToken(tokenData);

    return {
      token: token,
    };
  }

  async validateUser(userName: string, password: string) {
    const user = await this.userService.getUserByName(userName);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
