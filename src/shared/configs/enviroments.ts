import { config } from 'dotenv';

config();

export const enviroments = {
  port: process.env.PORT
};
