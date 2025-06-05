import { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '../cores/error.core'
import jwt from 'jsonwebtoken'

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  // console.log('Cookies received:', req.cookies)

  if (!req?.cookies?.access_token) throw new BadRequestException('Access token not found in cookies')

  const token = req.cookies.access_token

  const decoded = (await jwt.verify(token, process.env.JWT!)) as UserPayload
  const { id, name, email, role } = decoded

  req.currentUser = { id, name, email, role }

  next()
}
