import { ObjectType, Field, ID } from "type-graphql";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@ObjectType({ description: 'The URL model' })
@Entity("urls")
export class Url {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  @Field(() => String)
  originalUrl: string; 

  @Column()
  @Field(() => String)
  shortedUrl: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}
