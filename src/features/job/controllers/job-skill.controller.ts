import HTTP_STATUS from '~/globals/constants/http.constant'
import { jobSkillService } from '../services/job-skill.service'
import { Request, Response } from 'express'

class JobSkillController {
  public async create(req: Request, res: Response) {
    const jobSkill = await jobSkillService.create(req.body.jobId, req.body.skillName, req.currentUser!)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job skill successfully',
      data: jobSkill
    })
  }

  public async read(req: Request, res: Response) {
    const jobSkills = await jobSkillService.read(parseInt(req.params.jobId))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get job skills successfully',
      data: jobSkills
    })
  }

  public async remove(req: Request, res: Response) {
    await jobSkillService.remove(parseInt(req.params.jobId), req.params.skillName, req.currentUser!)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete job skill successfully'
    })
  }
}

export const jobSkillController = new JobSkillController()
