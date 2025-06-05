import HTTP_STATUS from '~/globals/constants/http.constant'
import { jobService } from '../services/job.service'
import { Request, Response } from 'express'

class JobController {
  public async create(req: Request, res: Response) {
    const job = await jobService.create(req.body, req.currentUser)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job successfully',
      data: job
    })
  }

  public async readAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '', minSalary = 0 } = req.query

    const { jobs, totalCounts } = await jobService.readAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter,
      minSalary: parseFloat(minSalary as string)
    })

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all jobs',
      jobs,
      totalCounts
    })
  }

  public async readAllForRecruiter(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '', minSalary = 0 } = req.query

    const { jobs, totalCounts } = await jobService.readAllForRecruiter({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter,
      minSalary: parseFloat(minSalary as string),
      user: req.currentUser
    })

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all jobs',
      jobs,
      totalCounts
    })
  }

  public async update(req: Request, res: Response) {
    const job = await jobService.update(
      parseInt(req.params.id),
      parseInt(req.params.companyid),
      req.currentUser,
      req.body
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update job successfully',
      data: job
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const job = await jobService.updateStatus(
      parseInt(req.params.id),
      parseInt(req.params.companyid),
      req.currentUser,
      req.body.status
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update job status successfully',
      data: job
    })
  }

  public async remove(req: Request, res: Response) {
    await jobService.remove(parseInt(req.params.id), parseInt(req.params.companyid), req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete job successfully'
    })
  }

  public async readOne(req: Request, res: Response) {
    const job = await jobService.readOne(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one job successfully',
      data: job
    })
  }
}

export const jobController = new JobController()
