import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUrlInput  {
  @Field(() => String)
  originalUrl: string; 

  @Field(() => String, { nullable: true })
  customName?: string;
}