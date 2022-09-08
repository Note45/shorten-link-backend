import { Url } from '../../../../src/modules/url/infra/typeorm/entities/Url';

describe('[MODULE/URL/INFRA/TYPEORM/ENTITIES]', () => {
  describe('[HAPPY-PATH]', () => {
    it('should be able to create url entity with defined id', async () => {
      const url = new Url();
      const urlMock = {
        originalUrl: 'http://test-url.com.br',
        shortenUrl: '0.com',
        id: '0166d67c-86d7-46d2-9181-8418128e47ad',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Object.assign(url, urlMock);

      expect(url.id).toBeDefined();
      expect(url).toEqual(urlMock);
    });
  });
});
