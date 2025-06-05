import { prisma } from '~/prisma'
import RedisClient from './redis.client'

const redisClient = new RedisClient()

export async function syncData() {
  const keys = await redisClient.client.keys('company_views:*')

  for (const key of keys) {
    const viewsString = await redisClient.client.hGet(key, 'views')
    if (viewsString) {
      const views = parseInt(viewsString)

      const companyId = key.split(':')[1]
      await prisma.company.update({
        where: { id: parseInt(companyId) },
        data: { views }
      })
    }
  }
}
