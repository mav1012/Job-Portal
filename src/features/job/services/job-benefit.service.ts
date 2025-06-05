import { prisma } from '~/prisma'
import { jobService } from './job.service'
import { NotFoundException } from '~/globals/cores/error.core'

class JobBenefitService {
  public async create(id: number, benefitName: string, currentUser: UserPayload) {
    await jobService.findJobbyUser(id, currentUser.id)
    await this.findBenefit(benefitName)

    const jobBenefit = await prisma.jobBenefit.create({
      data: {
        jobId: id,
        benefitName
      }
    })

    return jobBenefit
  }

  public async findBenefit(name: string) {
    const benefit = await prisma.benefit.findUnique({
      where: { name }
    })

    if (!benefit) throw new NotFoundException('Benefit not found')

    return benefit
  }

  public async read(id: number) {
    const jobBenefits = await prisma.jobBenefit.findMany({
      where: { jobId: id }
    })

    return jobBenefits
  }

  public async remove(id: number, benefitName: string, currentUser: UserPayload) {
    await jobService.findJobbyUser(id, currentUser.id)
    await this.findBenefit(benefitName)
    await this.findOne(id, benefitName)

    await prisma.jobBenefit.delete({
      where: {
        jobId_benefitName: {
          jobId: id,
          benefitName
        }
      }
    })
  }

  private async findOne(id: number, benefitName: string) {
    const jobBenefit = await prisma.jobBenefit.findUnique({
      where: {
        jobId_benefitName: {
          jobId: id,
          benefitName
        }
      }
    })

    if (!jobBenefit) throw new NotFoundException('Job benefit not found')

    return jobBenefit
  }
}

export const jobBenefitService = new JobBenefitService()
