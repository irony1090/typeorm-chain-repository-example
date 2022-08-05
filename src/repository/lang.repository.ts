import { createChainRepository } from "@irony0901/typeorm-chain-repository";
import { Keyword } from "../entity/keyword.entity";
import { Lang } from "../entity/lang.entity";

export const LangChainRepository = createChainRepository(Lang, {
  alias: 'LNG',
  primaryKeys: ['bbsId', 'type'],
  relationChain: {
    keywords: {
      Entity: Keyword, fieldIsMany: true,
      getBridges: ({selfEntities: langEntities, entityManager: em}) => 
        em.createQueryBuilder()
        .select('LNG_KWD.bbs_id', 'bbsId')
        .addSelect('LNG_KWD.type', 'type')
        .addSelect('LNG_KWD.keyword_id', 'keywordId')
        .from('lang_and_keyword', 'LNG_KWD')
        .where('LNG_KWD.bbs_id IN (:bbsIds)', {bbsIds: langEntities.map( ({bbsId}) => bbsId)})
        .orderBy('LNG_KWD.type', 'ASC')
        .addOrderBy('LNG_KWD.ord', 'ASC')
        .getRawMany()
        .then(
          result => result.map( ({bbsId, type, keywordId}) => ({self: {bbsId, type}, inverse: {id: keywordId}}))
        )
        // const {
        //   name: tableName, 
        //   joinColumns, inverseJoinColumns
        // } = getMetadataArgsStorage()
        // .findJoinTable(Lang, 'keywords' as keyof Lang)
      ,
      getDatas: ({selfEntities: langEntities, entityManager: em}) =>
        em.getRepository(Keyword)
        .createQueryBuilder('KWD')
        .leftJoin('lang_and_keyword', 'LNG_KWD', 'LNG_KWD.keyword_id = KWD.id')
        .where('LNG_KWD.bbs_id IN (:bbsIds)', {bbsIds: langEntities.map( ({bbsId}) => bbsId)})
        .getMany()
    }
  }
})