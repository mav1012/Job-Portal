import { NotFoundException } from '~/globals/cores/error.core'
import { candidateCompanyService } from './candidate-company.service'
import { prisma } from '~/prisma'

class IndustryService {
  public async create(companyId: number, industryName: string, currentUser: UserPayload) {
    const company = await candidateCompanyService.readOne(companyId, currentUser.id)
    const industry = await this.findOne(industryName)

    const companyIndustry = await prisma.companyIndustry.create({
      data: {
        companyId: company.id,
        industryName: industry.name
      }
    })

    return companyIndustry
  }

  public async read(companyId: number) {
    const companyIndustries = await prisma.companyIndustry.findMany({ where: { companyId } })

    return companyIndustries
  }

  public async remove(companyId: number, industryName: string, currentUser: UserPayload) {
    await candidateCompanyService.readOne(companyId, currentUser.id)
    await this.findOne(industryName)
    await this.findCompanyIndustry(companyId, industryName)

    await prisma.companyIndustry.delete({
      where: {
        companyId_industryName: {
          companyId,
          industryName
        }
      }
    })
  }

  private async findOne(industryName: string) {
    const industry = await prisma.industry.findFirst({
      where: { name: industryName }
    })

    if (!industry) throw new NotFoundException('Cannot find industry')

    return industry
  }

  private async findCompanyIndustry(companyId: number, industryName: string) {
    const companyIndustry = await prisma.companyIndustry.findUnique({
      where: { companyId_industryName: { companyId, industryName } }
    })

    if (!companyIndustry) throw new NotFoundException('Cannot find company industry')

    return companyIndustry
  }
}

export const industryService = new IndustryService()
