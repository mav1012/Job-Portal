import RedisClient from './redis.client'
import { excludeFields } from '~/globals/helpers/excludeFields.helper'
import { User } from '@prisma/client'

const redisClient = new RedisClient()

class UserRedis {
  public async getUserFromRedis(userKey: string) {
    const userCached = await redisClient.client.hGetAll(userKey)

    if (Object.keys(userCached).length) {
      const parsedUser = {
        id: userCached.id,
        name: userCached.name,
        email: userCached.email,
        password: userCached.password,
        role: userCached.role,
        status: userCached.status === 'true' ? true : false
      }

      return excludeFields(parsedUser, ['password'])
    }

    return null
  }

  public async saveUserToRedis(userKey: string, user: User) {
    const dataToRedis = {
      name: String(user.name),
      email: String(user.email),
      password: String(user.password),
      role: String(user.role),
      status: user.status ? 'true' : 'false'
    }

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(userKey, field, value)
    }
  }

  public async updateNameToRedis(userKey: string, name: string) {
    await redisClient.client.hSet(userKey, 'name', name)
  }

  public async updatePasswordToRedis(userKey: string, password: string) {
    await redisClient.client.hSet(userKey, 'password', password)
  }

  public async updateStatusToRedis(userKey: string, status: boolean) {
    await redisClient.client.hSet(userKey, 'status', status ? 'true' : 'false')
  }
}

export const userRedis: UserRedis = new UserRedis()
