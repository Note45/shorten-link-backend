import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { enviroments } from '../../../configs/enviroments';

const defaultOptions = {
  type: 'postgres',
  host: enviroments.database.host,
  port: enviroments.database.port,
  username: enviroments.database.user,
  password: enviroments.database.password,
  database: enviroments.isTestMode
    ? 'shorten-link-test'
    : enviroments.database.name,
  entities: [
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'modules',
      'url',
      'infra',
      'typeorm',
      'entities',
      '*.ts'
    )
  ],
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  cli: {
    entitiesDir: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'modules',
      'url',
      'infra',
      'typeorm',
      'entities'
    ),
    migrationsDir: path.join(__dirname, '..', 'migrations')
  }
} as ConnectionOptions;

export default defaultOptions;
