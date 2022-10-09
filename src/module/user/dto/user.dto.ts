export class UserDTO {
  _id: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class CreateUserDto {
  userName: string;
  password: string;
  email: string;
}

export enum UserType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  ORGANIZATION = 'ORGANIZATION',
}

export class CreateUserInput {
  email: string;
  phoneNumber: string;
  password: string;
}
