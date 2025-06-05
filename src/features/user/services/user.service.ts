import { User } from '@prisma/client'
import { prisma } from '~/prisma'
import bcrypt from 'bcrypt'
import { getPaginationAndFilters } from '~/globals/helpers/pagination1.helper'
import { ForbiddenException } from '~/globals/cores/error.core'
import RedisClient from '~/globals/cores/redis/redis.client'
import { excludeFields } from '~/globals/helpers/excludeFields.helper'
import RedisKey from '~/globals/constants/redisKeys.constant'
import { userRedis } from '~/globals/cores/redis/user.redis'
import { stat } from 'fs'

const redisClient = new RedisClient()

class UserService {
  public async createUser(reqBody: any): Promise<User> {
    const { name, email, password, role } = reqBody

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status: true,
        role
      }
    })

    return user
  }

  public async getAll({ page, limit, filter }: any) {
    const users = await prisma.user.findMany()

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'email'],
      entity: 'user'
    })

    return { users: data, totalCounts }
  }

  public async getOne(id: number) {
    const userKey = `${RedisKey.USERKEY}:${id}`

    const userCached = await userRedis.getUserFromRedis(userKey)

    if (userCached) return userCached

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) throw new Error('User not found')

    await userRedis.saveUserToRedis(userKey, user)

    return user
  }

  public async update(id: number, name: string, currentUser: UserPayload) {
    await this.getOne(id)

    const userKey = `${RedisKey.USERKEY}:${id}`

    if (currentUser.id !== id) throw new ForbiddenException('You are not allowed to update this user')

    const user = await prisma.user.update({
      where: { id },
      data: { name }
    })

    await userRedis.updateNameToRedis(userKey, name)

    return user
  }

  public async updatePassword(id: number, reqBody: any, currentUser: UserPayload) {
    const { currentPassword, newPassword, confirmPassword } = reqBody

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) throw new ForbiddenException('User not found')

    if (currentUser.id !== id) throw new ForbiddenException('You are not allowed to update this user')

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) throw new ForbiddenException('Current password is incorrect')

    if (newPassword !== confirmPassword) throw new ForbiddenException('New password and confirm password do not match')

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    })

    const userKey = `${RedisKey.USERKEY}:${id}`
    await userRedis.updatePasswordToRedis(userKey, hashedPassword)

    return updatedUser
  }

  public async updateStatus(id: number, status: boolean) {
    await this.getOne(id)

    const user = await prisma.user.update({
      where: { id },
      data: { status }
    })

    const userKey = `${RedisKey.USERKEY}:${id}`
    await userRedis.updateStatusToRedis(userKey, status)

    return user
  }
}

export const userService: UserService = new UserService()
