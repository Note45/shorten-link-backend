import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { UrlRepository } from '../database/repositories/implementations/UrlRepository';
import { Url } from '../entities/Url';
import { CreateUrlInput } from './types/UrlInput';

@Resolver((_of) => Url)
export class UrlResolver {
  private urlRepository: UrlRepository = new UrlRepository();

  @Query((_returns) => Url, { nullable: false })
  async getOriginalUrl(
    @Arg('shortenUrl', () => String) shortenUrl: string,
  ): Promise<Url> {
    const url = await this.urlRepository.findByShortenUrl(shortenUrl);

    if (!url) {
      throw new Error('Original url not found!');
    }

    return url;
  }

  @Mutation(() => Url)
  async createUrlShorted(
    @Arg('data', () => CreateUrlInput) { originalUrl, customName }: CreateUrlInput,
  ): Promise<Url> {
    let newUrlId;
    if (!customName) {
      newUrlId = await this.urlRepository.getNewUrlIndex();
    }

    const shortenUrl = `${customName || newUrlId}.com`;

    const customUrlAlreadyCreated = await this.urlRepository.findByShortenUrl(shortenUrl);
    if (customUrlAlreadyCreated) {
      return customUrlAlreadyCreated;
    }

    const url = await this.urlRepository.create(
      originalUrl,
      shortenUrl,
    );

    return url;
  }
}
