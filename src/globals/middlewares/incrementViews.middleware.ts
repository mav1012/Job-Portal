import { Request, Response, NextFunction } from 'express'

export function incrementViews(
  getRedisKey: (id: string) => string,
  getRedisViewKey: (id: string) => string,
  checkUserInSet: (key: string, userId: number) => Promise<number>,
  incrementRedisView: (key: string) => Promise<void>,
  addUserToSet: (key: string, userId: number) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const redisKey = getRedisKey(req.params.id)
    const redisViewKey = getRedisViewKey(req.params.id)

    const userId = req.currentUser?.id

    if (userId) {
      const isUserInSet = await checkUserInSet(redisViewKey, userId)
      if (!isUserInSet) {
        await incrementRedisView(redisKey)
        await addUserToSet(redisViewKey, userId)
      }
    }

    return next()
  }
}
