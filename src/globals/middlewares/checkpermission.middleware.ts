import { Request, Response, NextFunction } from 'express'
import { prisma } from '~/prisma'
import { ForbiddenException } from '../cores/error.core'

export function checkPermission(model: any, foreignField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser!.id
    const userRole = req.currentUser!.role
    const entityId = parseInt(req.params.id)

    try {
      const entity = await (prisma[model] as any).findUnique({
        where: { id: entityId }
      })

      if (userRole === 'ADMIN' || userRole === 'RECRUITER' || userId === entity?.[foreignField]) {
        return next()
      }

      return next(new ForbiddenException('You do not have permission to access this resource'))
    } catch (error) {
      return next(error)
    }
  }
}
