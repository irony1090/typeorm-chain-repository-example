import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Keyword } from "./keyword.entity";
import { Lang } from "./lang.entity";
import { User } from "./user.entity";

@Entity({ name: 'bbs' })
export class Bbs {
  @PrimaryGeneratedColumn({ name: 'bbs_id', type: 'bigint' })
  id: string;

  @Column({ length: 24, nullable: false })
  writer: string;

  @CreateDateColumn({ type: 'timestamp' })
  reg_date: Date;

  @ManyToOne( () => User )
  @JoinColumn({ name: 'user_id'})
  user?: User;

  @OneToMany( () => Lang, entity => entity.bbs)
  langs?: Array<Lang>;

  keywords_ko?: Array<Keyword>;
  keywords_us?: Array<Keyword>;
  keywords_fr?: Array<Keyword>;
}