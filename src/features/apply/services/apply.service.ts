import { candidateProfileService } from '~/features/candidate-profile/services/candidate-profile.service'
import { jobService } from '~/features/job/services/job.service'
import { NotFoundException } from '~/globals/cores/error.core'
import { getPaginationAndFilters } from '~/globals/helpers/pagination1.helper'
import { prisma } from '~/prisma'

class ApplyService {
  public async create(jobId: number, currentUser: UserPayload) {
    const profile = await candidateProfileService.readById(currentUser.id)

    const apply = await prisma.apply.create({
      data: {
        jobId,
        candidateProfileId: profile.id
      }
    })

    return apply
  }

  public async readMe({ page, limit }: any, currentUser: UserPayload) {
    const profile = await candidateProfileService.readById(currentUser.id)

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { candidateProfileId: profile.id }
    })

    return { applies: data, totalCounts }
  }

  public async readMeRecruiter({ page, limit }: any, jobId: number, currentUser: UserPayload) {
    const job = await jobService.findJobbyUser(jobId, currentUser.id)

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { jobId: job.id }
    })

    return { applies: data, totalCounts }
  }

  public async updateStatus(requestBody: any, currentUser: UserPayload) {
    const { id, jobId, status } = requestBody

    await jobService.findJobbyUser(jobId, currentUser.id)
    await this.findOne(id, jobId)

    const apply = await prisma.apply.update({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId: id,
          jobId
        }
      },
      data: {
        status
      }
    })

    return apply
  }

  private async findOne(candidateId: number, jobId: number) {
    const apply = await prisma.apply.findUnique({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId: candidateId,
          jobId
        }
      }
    })

    if (!apply) throw new NotFoundException('Application not found')

    return apply
  }
}

export const applyService = new ApplyService()
