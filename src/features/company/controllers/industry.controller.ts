import { Request, Response } from 'express'
import { industryService } from '../services/industry.service'
import HTTP_STATUS from '~/globals/constants/http.constant'

class IndustryController {
  public async create(req: Request, res: Response) {
    const companyIndustry = await industryService.create(parseInt(req.params.id), req.body.name, req.currentUser)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create company industry successfully',
      data: companyIndustry
    })
  }

  public async readAll(req: Request, res: Response) {
    const companyIndustries = await industryService.read(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Fetched company industries successfully',
      data: companyIndustries
    })
  }

  public async remove(req: Request, res: Response) {
    await industryService.remove(parseInt(req.params.id), req.body.name, req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete company industry successfully'
    })
  }
}

export const industryController = new IndustryController()
