import { config } from 'dotenv';

config();

export const enviroments = {
  port: process.env.PORT,
  mode: process.env.NODE_ENV,
  isTestMode: process.env.NODE_ENV === 'test',
  isDevelopMode: process.env.NODE_ENV === 'development',
  isProductionMode: process.env.NODE_ENV === 'production',
  database: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DATABASE_NAME
  }
};
