import { Request, Response, NextFunction } from 'express'
import { ForbiddenException } from '../cores/error.core'

export function allowAccess(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(new ForbiddenException("You don't have permission to access"))
    }
    return next()
  }
}
