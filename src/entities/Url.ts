import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({ description: 'The URL model' })
export class Url {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  originalUrl: String; 

  @Field(() => String)
  shortedUrl: String;
}
