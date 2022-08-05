import { Bbs } from "./entity/bbs.entity"
import { Keyword } from "./entity/keyword.entity"
import { Lang } from "./entity/lang.entity"
import { User } from "./entity/user.entity"
import { DataSource } from "typeorm"
import { getChainRepositories, PathString } from "@irony0901/typeorm-chain-repository"
import { BbsChainRepository } from "./repository/bbs.repository"

console.log('Hello Everyone')

export const AppDataSource = new DataSource({
  type: 'mysql', // Only mysql was completed.
  host: 'localhost', // INPUT YOUR HOST
  port: 3306, // INPUT YOUR PORT
  username: '{INPUT YOUR USERNAME}', // input your username
  password: '{INPUT YOUR PASSWORD}', // input your password
  database: 'test', // [Prior conditions] - Run "./example/example_mysql.sql"
  logging: true,
  entities: [
    Bbs, Lang, Keyword, User
  ]
})


const example_1 = async ( bbsId: string, details: Array<PathString<Bbs>> ) => {
  await AppDataSource.initialize();

  const repos = getChainRepositories({
    bbs: Bbs,
    bbsChain: BbsChainRepository
  }, AppDataSource.manager);

  const article: Bbs = await repos.bbs.findOne({where: {id: bbsId}})
  console.log('[article result]', article);

  await repos.bbsChain.setProperty(details, [article])
  console.log('[after setProperty]', article);

  await AppDataSource.destroy();
}

const example_2 = async ( details: Array<PathString<Bbs>> ) => {
  await AppDataSource.initialize();

  const repos = getChainRepositories({
    bbs: Bbs,
    bbsChain: BbsChainRepository
  }, AppDataSource.manager);

  const articles: Array<Bbs> = await repos.bbs.find();
  console.log('[articles result]', articles);

  await repos.bbsChain.setProperty(details, articles)
  console.log('[after setProperty]', articles);

  await AppDataSource.destroy();
}

const example_3 = async ( details: Array<PathString<Bbs>> ) => {
  await AppDataSource.initialize();

  const repos = getChainRepositories({
    bbsChain: BbsChainRepository
  }, AppDataSource.manager);

  const articles = await repos.bbsChain.getMany(
    ctx => ctx.createQueryBuilder(ctx.alias),
    details
  )
  console.log('[getMany]', articles);

  await AppDataSource.destroy();
}


example_1('1', ['langs.keywords', 'user']);
// example_2(['langs', 'user']);
// example_3(['langs.keywords']);

// example_1('1', ['keywords_fr', 'keywords_us', 'keywords_ko', 'user']);