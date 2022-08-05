# TypeORM's chain-repository-example
TypeORM's dynamic repository.   
Gets the desired data as a path-type string.
Support deep path.

## SAMPLE
``` javascript
import { Bbs } from './entity/bbs.entity';
import { BbsChainRepository } from './repository/bbs.repository';
import { getChainRepositories } from '@irony0901/typeorm-chain-repository';

const repos = getChainRepositories({
  bbs: Bbs,
  bbsChain: BbsChainRepository
}, AppDataSource.manager);

const article: Bbs = await repos.bbs.findOne({where: {id: '1'}})
console.log('[article result]', article);
/**
 *  [article result] Bbs { 
 *    id: '1', 
 *    writer: 'irony', 
 *    reg_date: 2022-08-05T12:00:00.000Z 
 *  }
 **/

// 'langs.keywords' is deep path from Bbs Object.
await repos.bbsChain.setProperty(['langs.keywords', 'user'], [article])
console.log('[after setProperty]', article);
/**
 *  [after setProperty] Bbs {
 *    id: '1',
 *    writer: 'irony',
 *    reg_date: 2022-08-05T12:00:00.000Z,
 *    user: User { 
 *      id: '1', 
 *      nickname: 'irony' 
 *    },
 *    langs: [
 *      Lang {
 *        bbsId: '1',
 *        type: 'FR',
 *        title: 'Ceci est le premier article',
 *        keywords: [Array]
 *      },
 *      Lang { 
 *        bbsId: '1', 
 *        type: 'KO', 
 *        title: '첫글입니다', 
 *        keywords: [Array] 
 *      },
 *      Lang {
 *        bbsId: '1',
 *        type: 'US',
 *        title: 'first article',
 *        keywords: [Array]
 *      }
 *    ]
 *  }
 *  
 **/
```

## NOTICE
* Only **Typescript**
* **CommonJS**
* TypeORM's version is based on **3.7**
* Only **mysql** was **completed**. MariaDB and OracleDB are expected to be possible

# How do you run the example
1. git clone https://github.com/irony1090/typeorm-chain-repository-example.git
2. run "./example/example_mysql.sql"
3. yarn or npm install
4. modify AppDataSource object in "./src/index.ts"
5. yarn bd2st or npm run bd2st

# Index
* [ERD](#ERD)   
  * [bbs](#[TABLE]-bbs)
  * [lang](#[TABLE]-lang)
  * [keyword](#[TABLE]-keyword)
  * [user](#[TABLE]-user)
* [Entity](#Entity)
  * [Bbs](#[entity]-Bbs)
  * [Lang](#[entity]-Lang)
  * [Keyword](#[entity]-Keyword)
  * [User](#[entity]-User)
  
## ERD
### [table]-bbs
| column    | type      | etc           |
|-----------|-----------|---------------|
| bbs_id    | bigint    | Primary key   |
| user_id   | bigint    | Foreign key   |
| writer    | varchar   |               |
| reg_date  | datetime  | default NOT() |
#### [table]-bbs data
| bbs_id  | user_id | writer  | reg_date            |
|-------- |---------|---------|---------------------|
| 1       | 1       | 'irony' | 2022-08-05 12:00:00 |
| 2       | 2       | 'peng'  | 2022-08-05 12:00:00 |
| 3       | 2       | 'peng'  | 2022-08-05 12:00:00 |

### [table]-lang
| column  | type    | etc                       |
|---------|---------|---------------------------|
| bbs_id  | bigint  | Primary key, Foreign key  |
| type    | varchar | Primary key               |
| title   | varchar |                           |
#### [table]-lang data
| bbs_id  | type  | title                         |
|-------- |-------|-------------------------------|
| 1       | 'US'  | 'first article'               |
| 1       | 'KO'  | '첫글입니다'                   |
| 1       | 'FR'  | 'Ceci est le premier article' |
| 2       | 'KO'  | '펭의 글'                     |
| 2       | 'US'  | 'pengs article'             |
| 3       | 'FR'  | 'Deuxième article de peng'    |
   
### [table]-keyword
| column      | type    | etc         |
|-------------|---------|-------------|
| keyword_id  | bigint  | Primary key |
| word        | varchar |             |
#### [table]-keyword data
| keyword_id  | word        |
|-------------|-------------|
| 1           | 'first'     |
| 2           | 'article'   |
| 3           | '첫글'      |
| 4           | 'Ceci'      |
| 5           | 'premier'   |
| 6           | '펭'        |
| 7           | '글'        |
| 8           | 'peng'      |
| 9           | 'Deuxième'  |

### [table]-lang_and_keyword
| column      | type    | etc                       |
|-------------|---------|---------------------------|
| keyword_id  | bigint  | Primary key, Foreign key  |
| bbs_id      | bigint  | Primary key, Foreign key  |
| type        | varchar | Primary key, Foreign key  |
| ord         | varchar |                           |
#### [table]-lang_and_keyword data
| keyword_id  | bbs_id  | type  | ord |
|-------------|---------|-------|-----|
| 1           | 1       | 'US'  | 1   |
| 2           | 1       | 'US'  | 2   |
| 3           | 1       | 'KO'  | 1   |
| 4           | 1       | 'FR'  | 1   |
| 5           | 1       | 'FR'  | 2   |
| 2           | 1       | 'FR'  | 3   |
| 6           | 2       | 'KO'  | 1   |
| 7           | 2       | 'KO'  | 2   |
| 8           | 2       | 'US'  | 1   |
| 2           | 2       | 'US'  | 2   |
| 9           | 3       | 'FR'  | 1   |
| 2           | 3       | 'FR'  | 2   |
| 8           | 3       | 'FR'  | 3   |


### [table]-user
| column    | type      | etc           |
|-----------|-----------|---------------|
| user_id   | bigint    | Primary key   |
| nickname  | varchar   |               |
#### [table]-user data
| user_id | nickname    |
|---------|-------------|
| 1       | 'irony'     | 
| 2       | 'peng'      | 
| 3       | 'likeAdmin' | 

## Entity
### [entity]-Bbs
``` javascript
@Entity({ name: 'bbs' })
class Bbs {

  @PrimaryGeneratedColumn({ name: 'bbs_id', type: 'bigint' })
  id: string;

  @Column({ length: 24, nullable: false })
  writer: string;

  @CreateDateColumn({ type: 'timestamp' })
  reg_date: Date;

  @ManyToOne( () => User )
  @JoinColumn({ name: 'user_id'})
  user: User;

  @OneToMany( () => Lang, entity => entity.bbs)
  langs: Array<Lang>;

  /**
  keywords_ko: Array<Keyword>;
  keywords_us: Array<Keyword>;
  keywords_fr: Array<Keyword>;
  **/
}
```

### [entity]-Lang
``` javascript
@Entity({ name: 'lang' })
class Lang {

  @PrimaryColumn({ name: 'bbs_id', type: 'bigint' })
  bbsId: string;

  @PrimaryColumn({ length: 8, nullable: false })
  type: string;

  @Column({ length: 128, nullable: false })
  title: string;

  @ManyToMany( () => Keyword, entity => entity.langs )
  @JoinTable({
    name: 'lang_and_keyword',
    joinColumns: [ 
      {name: 'bbs_id', referencedColumnName: 'bbsId'}, 
      {name: 'type', referencedColumnName: 'type'} 
    ],
    inverseJoinColumns: [
      {name: 'keyword_id', referencedColumnName: 'id' }
    ]
  })
  keywords: Array<Keyword>;

  @ManyToOne( () => Bbs, entity => entity.langs )
  @JoinColumn({name: 'bbs_id'})
  bbs: Bbs;
}
```

### [entity]-Keyword
``` javascript
@Entity({ name: 'keyword' })
class Keyword {

  @PrimaryGeneratedColumn({ name: 'keyword_id', type: 'bigint' })
  id: string;

  @Column({ length: 32, nullable: false })
  word: string;

  @ManyToMany( () => Lang, entity => entity.keywords)
  langs: Array<Lang>;
}
```

### [entity]-User
``` javascript
@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
  id: number;

  @Column({ length: 24, nullable: false })
  nickname: string;

}
```