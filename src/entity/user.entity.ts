import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
  
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
  id: string;

  @Column({ length: 24, nullable: false })
  nickname: string;

}