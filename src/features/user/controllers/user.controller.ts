import { NextFunction, Request, Response } from 'express'
import { userService } from '../services/user.service'
import { createUserSchema } from '../schemas/user.schema'
import HTTP_STATUS from '~/globals/constants/http.constant'
// import { NotFoundException } from '~/globals/cores/error.core'

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 5, filter = '' } = req.query

    const { users, totalCounts } = await userService.getAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    })

    res.status(200).json({
      message: 'Get all users',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: users
    })
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await userService.createUser(req.body)

    res.status(200).json({
      message: 'Create user',
      data: user
    })
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    const user = await userService.getOne(parseInt(req.params.id))

    res.status(200).json({
      message: 'Get one user',
      data: user
    })
  }

  public async update(req: Request, res: Response) {
    const user = await userService.update(parseInt(req.params.id), req.body.name, req.currentUser!)

    res.status(200).json({
      message: 'Update user',
      data: user
    })
  }

  public async updatePassword(req: Request, res: Response) {
    const user = await userService.updatePassword(parseInt(req.params.id), req.body.password, req.currentUser!)

    res.status(200).json({
      message: 'Update user password'
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const user = await userService.updateStatus(parseInt(req.params.id), req.body.status)

    res.status(200).json({
      message: 'Update user status',
      data: user
    })
  }
}

export const userController: UserController = new UserController()
