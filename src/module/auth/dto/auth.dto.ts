import { User } from 'src/module/user/model/user';

export class JWT {
  token: string;

  refreshToken: string;

  jwtPayload?: JwtTokenPayload;

  tokenType: string;

  expiresAt?: string;

  refreshTokenExpiresAt?: string;
}

class JwtTokenPayload {
  _id: string;

  user: User;
}
