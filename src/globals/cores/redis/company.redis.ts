import { Company } from '@prisma/client'
import RedisClient from './redis.client'
import { userController } from '~/features/user/controllers/user.controller'

const redisClient = new RedisClient()

class CompanyRedis {
  public async getCompanyFromRedis(companyKey: string) {
    const companyCached = await redisClient.client.hGetAll(companyKey)

    if (Object.keys(companyCached).length) {
      const parsedCompany = {
        ...companyCached,
        id: parseInt(companyCached.id),
        teamSize: parseInt(companyCached.teamSize),
        establishmentDate: new Date(companyCached.establishmentDate),
        views: parseInt(companyCached.views),
        websiteUrl: companyCached.websiteUrl ?? null,
        isApproved: companyCached.isApproved === 'true' ? true : false,
        mapLink: companyCached.mapLink ?? null,
        address: companyCached.address ?? null,
        userId: parseInt(companyCached.userId)
      }

      return parsedCompany
    }

    return null
  }

  public async saveCompanyToRedis(companyKey: string, company: Company) {
    const dataToRedis = {
      id: String(company.id),
      name: String(company.name),
      description: String(company.description),
      teamSize: String(company.teamSize),
      establishmentDate: String(company.establishmentDate),
      views: String(company.views),
      websiteUrl: String(company.websiteUrl),
      isApproved: String(company.isApproved),
      mapLink: String(company.mapLink),
      address: String(company.address),
      userId: String(company.userId)
    }

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(companyKey, field, value)
    }
  }

  public async checkUserInSet(companyViewsKey: string, userId: number) {
    const isMember = await redisClient.client.sIsMember(companyViewsKey, userId.toString())

    return isMember
  }

  public async incrementCompanyViews(companyKey: string) {
    await redisClient.client.hIncrBy(companyKey, 'views', 1)
  }

  public async addMemberToSet(companyViewKey: string, userId: number) {
    await redisClient.client.sAdd(companyViewKey, userId.toString())
  }
}

export const companyRedis: CompanyRedis = new CompanyRedis()
