import { CompanyImage } from '@prisma/client'
import { NotFoundException } from '~/globals/cores/error.core'
import { prisma } from '~/prisma'
import { candidateCompanyService } from './candidate-company.service'
import { deleteImage } from '~/globals/helpers/upload.helper'

class CompanyImageService {
  public async add(companyId: number, currentUser: UserPayload, files: Express.Multer.File[]) {
    const company = await prisma.company.findUnique({ where: { id: companyId } })
    if (!company) throw new NotFoundException('Company not found')

    const data: { companyId: number; url: string }[] = []

    for (const file of files) {
      data.push({
        companyId: company.id,
        url: file.filename
      })
    }

    return await prisma.companyImage.createMany({ data })
  }

  public async readAll(companyId: number) {
    const companyImages: CompanyImage[] = await prisma.companyImage.findMany({
      where: { companyId }
    })

    return companyImages
  }

  private async findOne(companyId: number, companyImageId: number) {
    const companyImage = await prisma.companyImage.findFirst({
      where: {
        id: companyImageId,
        companyId
      }
    })

    if (!companyImage) throw new NotFoundException('Cannot find image')

    return companyImage
  }

  public async remove(companyId: number, currentUser: UserPayload, companyImageId: number) {
    const company = await candidateCompanyService.readOne(companyId, currentUser.id)
    const image = await this.findOne(companyId, companyImageId)

    await deleteImage(image.url)

    await prisma.companyImage.delete({
      where: {
        id: companyImageId,
        companyId: company.id
      }
    })
  }
}

export const companyImageService: CompanyImageService = new CompanyImageService()
