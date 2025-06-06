import { Request, Response } from 'express'
import { companyImageService } from '../services/company-image.service'
import HTTP_STATUS from '~/globals/constants/http.constant'

class CompanyImageController {
  public async add(req: Request, res: Response) {
    const companyId = parseInt(req.params.companyId)
    const files = req.files as Express.Multer.File[]

    const result = await companyImageService.add(companyId, req.currentUser!, files)

    return res.status(201).json({
      message: 'Company image added successfully',
      data: result
    })
  }

  public async readAll(req: Request, res: Response) {
    const companyId = parseInt(req.params.companyId)

    const result = await companyImageService.readAll(companyId)

    return res.status(200).json({
      message: 'Company images fetched successfully',
      data: result
    })
  }

  public async remove(req: Request, res: Response) {
    await companyImageService.remove(
      parseInt(req.params.companyId),
      req.currentUser!,
      parseInt(req.params.companyImageId)
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Deleted company image successfully'
    })
  }
}

export const companyImageController = new CompanyImageController()
