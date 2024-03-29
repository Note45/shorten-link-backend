import { Url } from '../infra/typeorm/entities/Url';

export interface IUrlRepository {
  findByShortenUrl(shortenUrl: string): Promise<Url | undefined>;
  getNewUrlIndex(): Promise<number>;
  create(originalUrl: string, shortenUrl: string): Promise<Url>;
}
