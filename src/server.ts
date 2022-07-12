import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UrlResolver } from './resolvers/Url';

const init = async () => {
  const schema = await buildSchema({
    resolvers: [
      UrlResolver
    ],
    emitSchemaFile: true,
    validate: false,
  });

  const graphqlServer = new ApolloServer({
    schema,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
  });

  const app = express();

  await graphqlServer.start();

  graphqlServer.applyMiddleware({ app });

  app.listen({ port: 3333 }, () =>
    console.log(
      `Server ready and listening at ==> http://localhost:3333${graphqlServer.graphqlPath}`
    )
  );
};

init().catch((error) => {
  console.log('Erro when try run ther server: ', error);
});