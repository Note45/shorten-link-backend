import 'reflect-metadata';

import { container } from 'tsyringe';
import { UrlResolver } from '../../../../src/modules/url/resolvers/Url';

describe('[MODULE/URL/RESOLVERS]', () => {
  describe('[HAPPY-PATH]', () => {
    it('should be able to create a shoted url with custom name', async () => {
      const urlParams = {
        originalUrl: 'http://test-url.com.br',
        customName: 'test'
      };
      const urlMock = {
        originalUrl: urlParams.originalUrl,
        shortenUrl: `${urlParams.customName}.com`,
        id: '0166d67c-86d7-46d2-9181-8418128e47ad',
        createdAt: '2022-09-08T16:15:27.763Z',
        updatedAt: '2022-09-08T16:15:27.763Z'
      };

      jest.spyOn(container, 'resolve').mockImplementationOnce(() => ({
        findByShortenUrl: () => null,
        create: () => urlMock
      }));

      const urlResolver = new UrlResolver();
      const resolverResult = await urlResolver.createUrlShorted(urlParams);

      expect(resolverResult).toBe(urlMock);
    });

    it('should be able to create a shoted url without custom name', async () => {
      const urlParam = {
        originalUrl: 'http://test-url.com.br'
      };
      const urlMock = {
        originalUrl: urlParam.originalUrl,
        shortenUrl: '0.com',
        id: '0166d67c-86d7-46d2-9181-8418128e47ad',
        createdAt: '2022-09-08T16:15:27.763Z',
        updatedAt: '2022-09-08T16:15:27.763Z'
      };

      jest.spyOn(container, 'resolve').mockImplementationOnce(() => ({
        findByShortenUrl: () => null,
        create: () => urlMock,
        getNewUrlIndex: () => 0
      }));

      const urlResolver = new UrlResolver();
      const resolverResult = await urlResolver.createUrlShorted(urlParam);

      expect(resolverResult).toBe(urlMock);
    });

    it('should be able to get the original url from shortenUrl', async () => {
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

      jest.spyOn(container, 'resolve').mockImplementationOnce(() => ({
        findByShortenUrl: () => urlMock
      }));

      const urlResolver = new UrlResolver();
      const resolverResult = await urlResolver.getOriginalUrl(
        urlParam.shortenUrl
      );

      expect(resolverResult).toBe(urlMock);
    });
  });

  describe('[UNHAPPY-PATH]', () => {
    it('should not be able to get unsaved url', async () => {
      const urlParam = {
        originalUrl: 'http://not-saved-url.com.br'
      };

      jest.spyOn(container, 'resolve').mockImplementationOnce(() => ({
        findByShortenUrl: () => null
      }));

      const urlResolver = new UrlResolver();

      await expect(
        urlResolver.getOriginalUrl(urlParam.originalUrl)
      ).rejects.toThrowError(new Error('Original url was not found!'));
    });
  });
});
