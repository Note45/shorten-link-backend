import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Url } from "../entities/Url";
import { CreateUrlInput } from "./types/UrlInput";

@Resolver(of => Url)
export class UrlResolver {
  private urls: Url[] = [];

  @Query((_returns) => Url, { nullable: false })
  async getOriginalUrl(
    @Arg('shortedUrl', () => String) shortedUrl: String
  ): Promise<Url> {
    const originalUrlId = shortedUrl.split('.')[0];

    const url = this.urls.find(url => url.id === originalUrlId);

    if (!url) {
      throw new Error('Original url not found!');
    }

    return url;
  }

  @Mutation(() => Url)
  async createUrlShorted(
    @Arg('data', () => CreateUrlInput) { originalUrl, customName }: CreateUrlInput
  ): Promise<Url>{
    const newUrlId = this.urls.length.toString();
    const shortedUrl = `${customName ? customName : newUrlId}.com`;

    const customUrlAlreadyCreated = this.urls.find(url => url.shortedUrl === shortedUrl);
    if (customUrlAlreadyCreated) {
      return customUrlAlreadyCreated;
    }

    const url = new Url();
    Object.assign(url, {
      id: newUrlId,
      shortedUrl,
      originalUrl
    })

    this.urls.push(url);

    return url;
  }
}