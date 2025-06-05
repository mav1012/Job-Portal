import { Request, Response } from 'express'
import { packageService } from '../services/package.service'
import HTTP_STATUS from '~/globals/constants/http.constant'

class PackageController {
  public async create(req: Request, res: Response) {
    const packageEntity = await packageService.create(req.body)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    })
  }

  public async readAll(req: Request, res: Response) {
    const packages = await packageService.readAll()

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get packages successfully',
      data: packages
    })
  }

  public async readOne(req: Request, res: Response) {
    const packageEntity = await packageService.readOne(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one package successfully',
      data: packageEntity
    })
  }

  public async update(req: Request, res: Response) {
    const packageEntity = await packageService.update(parseInt(req.params.id), req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update package successfully',
      data: packageEntity
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const packageEntity = await packageService.updateStatus(parseInt(req.params.id), req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update package status successfully',
      data: packageEntity
    })
  }
}

export const packageController = new PackageController()
