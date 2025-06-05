import HTTP_STATUS from '~/globals/constants/http.constant'
import { recruiterPackageService } from '../services/recruiter-package.service'
import { Request, Response } from 'express'

class RecruiterPackageController {
  public async create(req: Request, res: Response) {
    const packageEntity = await recruiterPackageService.create(req.body.packageId, req.currentUser)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    })
  }
}

export const recruiterPackageController = new RecruiterPackageController()
