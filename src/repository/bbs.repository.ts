import { createChainRepository } from "@irony0901/typeorm-chain-repository";
import { Bbs } from "../entity/bbs.entity";
import { Lang } from "../entity/lang.entity";
import { User } from "../entity/user.entity";
import { LangChainRepository } from "./lang.repository";

export const BbsChainRepository = createChainRepository(Bbs, {
  alias: 'BBS', 
  primaryKeys: ['id'],
  relationChain: {
    user: {
      Entity: User,
      getBridges: ({selfEntities: bbsEntities, entityManager: em}) => 
        em.getRepository(Bbs)
        .createQueryBuilder('BBS_BRG')
        .select('BBS_BRG.id', 'bbs_id')
        .addSelect('BBS_BRG.user', 'user_id')
        .where('BBS_BRG.id IN (:bbs_ids)', {bbs_ids: bbsEntities.map( ({id}) => id)})
        .getRawMany()
        .then(
          result => result.map( ({bbs_id, user_id}) => ({self: {id: bbs_id}, inverse: {id: user_id}}))
        )
      ,
      getDatas: ({selfEntities: bbsEntities, entityManager: em}) => 
        em.getRepository(User)
        .createQueryBuilder('USR')
        .leftJoin('bbs', 'BBS', 'BBS.user_id = USR.id')
        .where('BBS.bbs_id IN (:bbs_ids)', {bbs_ids: bbsEntities.map( ({id}) => id)})
        .getMany()
    },
    langs: {
      Entity: Lang, fieldIsMany: true,
      Repository: LangChainRepository,
      getBridges: async ({selfEntities: bbsEntities, entityManager: em}) => 
        em.getRepository(Lang)
        .createQueryBuilder('LNG_BRG')
        .select('LNG_BRG.bbsId', 'id')
        .addSelect('LNG_BRG.type', 'type')
        .where('LNG_BRG.bbsId IN (:bbsIds)', {bbsIds: bbsEntities.map( ({id}) => id)})
        .getRawMany()
        .then( 
          result => result.map( ({id, type}) => ({self: {id}, inverse: {bbsId: id, type}}))
        )
        
      
    }
  },
  setPropertySubscriber: [
    {
      where: ({details}) => details.some( dtl => /^keywords_(ko|us|fr)/.test(dtl)),
      details: ['langs.keywords'],
      after: ({entities, details}) => {
        const langCodes = details.filter( dtl => dtl.startsWith('keywords_'))
          .map( dtl => dtl.substring('keywords_'.length));

        entities.forEach( entity => {
          if( entity.langs?.length > 0 ){
            langCodes.forEach( code => {
              const kwds = entity.langs?.find( lang => lang.type === code.toUpperCase())?.keywords;
              if( kwds?.length > 0 )
                entity[`keywords_${code}`] = kwds;
            })
            
          }
        })
      }
    }
  ]
})