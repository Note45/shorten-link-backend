import { Field, InputType } from "type-graphql";
import { Url } from "../../entities/Url";

@InputType()
export class CreateUrlInput implements Partial<Url>{
  @Field(() => String)
  originalUrl: String; 
}