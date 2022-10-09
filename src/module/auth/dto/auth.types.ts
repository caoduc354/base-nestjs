import { UserType } from 'src/module/user/dto/user.dto';

export interface AccessTokenJwtData {
  uid?: string;
  refreshToken?: string;
  type?: UserType | null;
}

export interface AccessTokenJwtRawData {
  uid: string;
  type: UserType;
}
