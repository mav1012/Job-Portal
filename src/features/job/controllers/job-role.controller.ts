import { Request, Response } from 'express'
import HTTP_STATUS from '~/globals/constants/http.constant'
import { jobRoleService } from '../services/job-role.service'

class JobRoleController {
  public async create(req: Request, res: Response) {
    const jobRole = await jobRoleService.create(req.body)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job role successfully',
      data: jobRole
    })
  }

  public async readAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await jobRoleService.readAll(page, limit)

    return res.status(200).json({
      message: 'Job roles fetched successfully',
      ...result
    })
  }

  public async remove(req: Request, res: Response) {
    const name = req.body
    await jobRoleService.remove(name)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Job role deleted successfully'
    })
  }
}

export const jobRoleController = new JobRoleController()
