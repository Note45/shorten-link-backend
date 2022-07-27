import { ObjectType, Field, ID } from "type-graphql";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryColumn,
  UpdateDateColumn 
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@ObjectType({ description: 'The URL model' })
@Entity("urls")
export class Url {
  @Field(() => ID)
  @PrimaryColumn()
  id?: string;

  @Field(() => String)
  @Column()
  originalUrl: string; 

  @Field(() => String)
  @Column()
  shortenUrl: string;

  @Field(() => String)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}
