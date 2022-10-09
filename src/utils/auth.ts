import * as bcrypt from 'bcrypt';
import appEnv from '../config/env.configuration';

export const hashString = (
  string: string,
  saltRounds = appEnv().jwt.SALT_ROUNDS,
): string => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(string, salt);
};
