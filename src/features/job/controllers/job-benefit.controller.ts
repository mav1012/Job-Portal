import { Request, Response } from 'express'
import { jobBenefitService } from '../services/job-benefit.service'
import HTTP_STATUS from '~/globals/constants/http.constant'

class JobBenefitController {
  public async create(req: Request, res: Response) {
    const jobBenefit = await jobBenefitService.create(req.body.jobId, req.body.benefitName, req.currentUser)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job benefit successfully',
      data: jobBenefit
    })
  }

  public async read(req: Request, res: Response) {
    const jobBenefits = await jobBenefitService.read(parseInt(req.params.jobId))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get job benefits successfully',
      data: jobBenefits
    })
  }

  public async remove(req: Request, res: Response) {
    await jobBenefitService.remove(parseInt(req.params.jobId), req.params.benefitName, req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete job benefit successfully'
    })
  }
}

export const jobBenefitController = new JobBenefitController()
