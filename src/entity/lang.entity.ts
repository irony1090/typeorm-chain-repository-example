import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Bbs } from "./bbs.entity";
import { Keyword } from "./keyword.entity";
@Entity({ name: 'lang' })
export class Lang {

  @PrimaryColumn({ name: 'bbs_id', type: 'bigint' })
  bbsId: string;

  @PrimaryColumn({ length: 8, nullable: false })
  type: string;

  @Column({ length: 128, nullable: false })
  title: string;

  @ManyToMany( () => Keyword, entity => entity.langs )
  @JoinTable({
    name: 'lang_and_keyword',
    joinColumns: [ {name: 'bbs_id', referencedColumnName: 'bbsId'}, {name: 'type', referencedColumnName: 'type'} ],
    inverseJoinColumns: [{name: 'keyword_id', referencedColumnName: 'id' }]
  })
  keywords?: Array<Keyword>;

  @ManyToOne( () => Bbs, entity => entity.langs )
  @JoinColumn({name: 'bbs_id'})
  bbs?: Bbs;
}