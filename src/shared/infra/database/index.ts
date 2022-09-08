import { Connection, createConnection } from 'typeorm';
import defaultOptions from './configs';

export default async (): Promise<Connection> =>
  createConnection(defaultOptions);
