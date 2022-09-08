import supertest, { SuperTest, Test } from 'supertest';
import { Connection, Repository } from 'typeorm';
import getDdConection from '../../../src/shared/infra/database';
import { Url } from '../../../src/modules/url/infra/typeorm/entities/Url';

describe('[MODULE/URL] - Url module', () => {
  let superTestServer: SuperTest<Test>;
  let urlRepository: Repository<Url>;
  let dbConection: Connection;

  beforeAll(async () => {
    superTestServer = supertest('http://localhost:3333/graphql');
  });

  describe('[HAPPY-PATH]', () => {
    beforeAll(async () => {
      dbConection = await getDdConection();
      urlRepository = dbConection.getRepository(Url);
    });

    beforeEach(async () => {
      await urlRepository.createQueryBuilder().delete().from(Url).execute();
    });

    afterAll(async () => {
      await dbConection.close();
    });

    it('should be able to create a shorted Url with custom name', async () => {
      const queryFields = {
        originalUrl:
          'https://www.istoedinheiro.com.br/tag/www-caixa-gov-com-br/',
        custonName: '21'
      };

      const query = `
      mutation {
        createUrlShorted(
          data: {
            originalUrl: "${queryFields.originalUrl}", 
            customName: "${queryFields.custonName}"
          }
        ) {
          shortenUrl,
          originalUrl
        }
      }    
      `;

      const queryResponse = await superTestServer.post('').send({
        query
      });

      expect(queryResponse.body.data).toStrictEqual({
        createUrlShorted: {
          originalUrl: queryFields.originalUrl,
          shortenUrl: `${queryFields.custonName}.com`
        }
      });
    });

    it('should be able to create a shorted Url without custom name', async () => {
      const queryFields = {
        originalUrl: 'https://www.isto.com.br/tag/www-caixa-gov-com-br/'
      };

      const query = `
      mutation {
        createUrlShorted(
          data: {
            originalUrl: "${queryFields.originalUrl}", 
          }
        ) {
          shortenUrl,
          originalUrl
        }
      }    
      `;

      const queryResponse = await superTestServer.post('').send({
        query
      });

      expect(queryResponse.body.data).toStrictEqual({
        createUrlShorted: {
          originalUrl: queryFields.originalUrl,
          shortenUrl: '0.com'
        }
      });
    });
  });

  describe('[UNHAPPY-PATH]', () => {
    beforeAll(async () => {
      dbConection = await getDdConection();
      urlRepository = dbConection.getRepository(Url);
    });

    beforeEach(async () => {
      await urlRepository.createQueryBuilder().delete().from(Url).execute();
    });

    afterAll(async () => {
      await dbConection.close();
    });

    it('should not be able to create a shorted Url with missing field', async () => {
      const query = `
      mutation {
        createUrlShorted(
          data: {
          }
        ) {
          shortenUrl,
          originalUrl
        }
      }    
      `;

      const queryResponse = await superTestServer.post('').send({
        query
      });

      expect(queryResponse.status).toEqual(400);
      expect(queryResponse.text).toEqual(
        '{"errors":[{"message":"Field \\"CreateUrlInput.originalUrl\\" of required type \\"String!\\" was not provided.","extensions":{"code":"GRAPHQL_VALIDATION_FAILED"}}]}\n'
      );
    });
  });
});
