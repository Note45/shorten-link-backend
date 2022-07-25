import { Url } from "../../entities/Url";
import { CreateUrlInput } from "../../resolvers/types/UrlInput";

export interface IUrlRepository {
  findByShortenUrl(shortenUrl: string): Promise<Url>;
  getNewUrlIndex(): Promise<number>;
  create({ 
    originalUrl, 
    customName 
  }: CreateUrlInput): Promise<void>;
}