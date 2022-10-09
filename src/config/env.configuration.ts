import * as Joi from 'joi';

import * as dotenv from 'dotenv';
const envConfig = dotenv.config().parsed;
export { envConfig };

export interface JwtIF {
  JWT_TOKEN_EXPIRE_IN: string;
  JWT_REFRESH_TOKEN_EXPIRE_IN: string;
  SALT_ROUNDS: number;
  AUTH_JWT_SECRET: string;
  //   RESET_PASSWORD_EXPIRE_IN: string;
}

export interface DatabaseIF {
  MONGO_URI: string;
  //   DATABASE_NAME: string;
}

export interface Social {
  AUTH_PROVIDER_GOOGLE_CLIENT_IDS: string;
  AUTH_PROVIDER_FACEBOOK_SECRET_ID: string;
}

export interface AppConfiguration {
  //   LIMIT_GROUP_PRODUCTS_ON_CATEGORY: number;
  //   REDIS_HOST: string;
  //   REDIS_PORT: number;
  jwt: JwtIF;
  database: DatabaseIF;
  //   facebookSecretId: string;
  //   googleClientIds: string[];
  //   social: Social;
}

const env: AppConfiguration = {
  jwt: {
    JWT_REFRESH_TOKEN_EXPIRE_IN: envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN_SEC,
    SALT_ROUNDS: +envConfig.SALT_ROUNDS,
    AUTH_JWT_SECRET: envConfig.JWT_SECRET_VERIFY,
    JWT_TOKEN_EXPIRE_IN: envConfig.JWT_EXPIRES_IN_SEC,
    // RESET_PASSWORD_EXPIRE_IN: envConfig.RESET_PASSWORD_EXPIRE_IN,
  },
  database: {
    // DATABASE_NAME: envConfig.DATABASE_NAME,
    MONGO_URI: envConfig.MONGO_URL,
  },
};

export const validationSchema = Joi.object({
  jwt: {
    JWT_TOKEN_EXPIRE_IN: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRE_IN: Joi.string().required(),
    SALT_ROUNDS: Joi.number().required(),
    AUTH_JWT_SECRET: Joi.string().required(),
    // RESET_PASSWORD_EXPIRE_IN: Joi.string().required(),
  },
  database: {
    // DATABASE_NAME: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
  },
});

export default (): AppConfiguration => {
  const { error } = validationSchema.validate(env);
  if (error) {
    throw new Error(error.message);
  }
  return env;
};
