import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUrlInput  {
  @Field(() => String)
  originalUrl: String; 

  @Field(() => String, { nullable: true })
  customName?: String;
}