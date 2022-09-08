import * as typeorm from 'typeorm/globals';
import { UrlRepository } from '../../../../src/modules/url/infra/typeorm/repositories/UrlRepository';

describe('[MODULE/URL/INFRA/TYPEORM/REPOSITORIES]', () => {
  describe('[HAPPY-PATH]', () => {
    it('should be able to get a new url index', async () => {
      const originalTypeormMethods = jest.requireActual('typeorm');
      jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => ({
        ...originalTypeormMethods,
        count: async () => 0
      }));

      const urlRepository = new UrlRepository();
      const repositoryResult = await urlRepository.getNewUrlIndex();

      expect(repositoryResult).toBe(0);
    });

    it('should be able to get an url by shoten url', async () => {
      const urlParam = {
        shortenUrl: '0.com'
      };
      const urlMock = {
        originalUrl: 'http://test-url.com.br',
        shortenUrl: urlParam.shortenUrl,
        id: '0166d67c-86d7-46d2-9181-8418128e47ad',
        createdAt: '2022-09-08T16:15:27.763Z',
        updatedAt: '2022-09-08T16:15:27.763Z'
      };

      const originalTypeormMethods = jest.requireActual('typeorm');
      jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => ({
        ...originalTypeormMethods,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        findOne: async (_params: any) => urlMock
      }));

      const urlRepository = new UrlRepository();
      const repositoryResult = await urlRepository.findByShortenUrl(
        urlParam.shortenUrl
      );

      expect(repositoryResult).toBe(urlMock);
    });

    it('should be able to create a new url', async () => {
      const urlParam = {
        shortenUrl: '0.com',
        originalUrl: 'http://test-url.com.br'
      };
      const urlMock = {
        originalUrl: urlParam.originalUrl,
        shortenUrl: urlParam.shortenUrl,
        id: '0166d67c-86d7-46d2-9181-8418128e47ad',
        createdAt: '2022-09-08T16:15:27.763Z',
        updatedAt: '2022-09-08T16:15:27.763Z'
      };

      const originalTypeormMethods = jest.requireActual('typeorm');
      jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => ({
        ...originalTypeormMethods,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: async (_params: any) => urlMock,
        save: async (_params: any) => urlMock
      }));

      const urlRepository = new UrlRepository();
      const repositoryResult = await urlRepository.create(
        urlParam.originalUrl,
        urlParam.shortenUrl
      );

      expect(repositoryResult).toBe(urlMock);
    });
  });
});
