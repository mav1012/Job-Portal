import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const token = req?.cookies?.access_token

  if (!token) {
    // No token? Just move ahead — allow anonymous
    req.currentUser = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT!) as UserPayload
    const { id, name, email, role } = decoded

    req.currentUser = { id, name, email, role }
  } catch (err) {
    // Invalid token? Treat as anonymous too.
    req.currentUser = null
  }

  return next()
}
