import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lang } from "./lang.entity";

@Entity({ name: 'keyword' })
export class Keyword {
  @PrimaryGeneratedColumn({ name: 'keyword_id', type: 'bigint' })
  id: string;

  @Column({ length: 32, nullable: false })
  word: string;

  @ManyToMany( () => Lang, entity => entity.keywords)
  langs: Array<Lang>;
}