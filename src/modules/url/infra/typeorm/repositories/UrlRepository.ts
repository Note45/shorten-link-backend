import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { Url } from '../entities/Url';
import { IUrlRepository } from '../../../repositories/IUrlRepository';

@injectable()
export class UrlRepository implements IUrlRepository {
  private readonly repository: Repository<Url>;

  constructor() {
    this.repository = getRepository(Url);
  }

  async findByShortenUrl(shortenUrl: string): Promise<Url | undefined> {
    const url = await this.repository.findOne({
      where: {
        shortenUrl
      }
    });

    return url;
  }

  async getNewUrlIndex(): Promise<number> {
    const newUrlIndex = await this.repository.count();

    return newUrlIndex;
  }

  async create(originalUrl: string, shortenUrl: string): Promise<Url> {
    const urlFields = new Url();
    Object.assign(urlFields, {
      originalUrl,
      shortenUrl
    });

    const url = this.repository.create(urlFields);

    await this.repository.save(url);

    return url;
  }
}
