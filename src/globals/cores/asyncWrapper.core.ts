import { NextFunction, Request, Response } from 'express'

function asyncWrapper(cb: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res, next).catch((err: any) => next(err))
  }
}

export default asyncWrapper
