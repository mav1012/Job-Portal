import { Job } from '@prisma/client'
import { candidateCompanyService } from '~/features/company/services/candidate-company.service'
import { NotFoundException } from '~/globals/cores/error.core'
import { getPaginationAndFilters } from '~/globals/helpers/pagination1.helper'
import { serializeData } from '~/globals/helpers/serialize.helper'
import { prisma } from '~/prisma'
import { jobRoleService } from './job-role.service'
import { IJob } from '../interfaces/job.interface'
import { subscriptionGuardService } from './helper.service'

class JobService {
  public async create(body: IJob, currentUser: UserPayload): Promise<Job> {
    const { companyId, title, description, status, minSalary, maxSalary, jobRoleName } = body

    await subscriptionGuardService.validateJobPostLimit(currentUser)

    const job = await prisma.job.create({
      data: {
        companyId,
        postById: currentUser.id,
        jobRoleName,
        title,
        description,
        status,
        minSalary,
        maxSalary
      }
    })

    return job
  }

  public async readAll({ page, limit, filter, minSalary }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary } },
      orderCondition: { createdAt: 'desc' }
    })

    return { jobs: data, totalCounts }
  }

  public async readAllForRecruiter({ page, limit, filter, minSalary, user }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary }, postById: user.id, isDeleted: false },
      orderCondition: { createdAt: 'desc' }
    })

    return { jobs: data, totalCounts }
  }

  public async readOne(id: number) {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    })

    if (!job) throw new NotFoundException('Job not found')

    const dataConfig = {
      company: [
        { newKey: 'companyName', property: 'name' },
        { newKey: 'companyWebsiteUrl', property: 'websiteUrl' }
      ],
      postBy: [{ newKey: 'postByName', property: 'name' }]
    }

    return serializeData(job, dataConfig)
  }

  public async update(id: number, companyId: number, user: UserPayload, reqBody: IJob) {
    const { title, description, minSalary, maxSalary, jobRoleName } = reqBody

    await this.findOne(id, companyId, user.id)
    if (jobRoleName) await jobRoleService.readOne(jobRoleName)

    const job = await prisma.job.update({
      where: { id, companyId, postById: user.id },
      data: {
        title,
        description,
        minSalary,
        maxSalary,
        jobRoleName
      }
    })

    return job
  }

  public async updateStatus(id: number, companyId: number, user: UserPayload, status: any) {
    await this.findOne(id, companyId, user.id)

    const job = await prisma.job.update({
      where: { id, companyId, postById: user.id },
      data: {
        status
      }
    })

    return job
  }

  public async remove(id: number, companyId: number, user: UserPayload) {
    await this.findOne(id, companyId, user.id)

    const job = await prisma.job.update({
      where: { id, companyId, postById: user.id },
      data: {
        isDeleted: true
      }
    })

    return job
  }

  private async findOne(id: number, companyId: number, userId: number) {
    const job = await prisma.job.findFirst({
      where: { id, companyId, postById: userId }
    })

    if (!job) throw new NotFoundException('Job not found')

    return job
  }

  public async findJobbyUser(id: number, userId: number) {
    const job = await prisma.job.findFirst({
      where: { id, postById: userId }
    })

    if (!job) throw new NotFoundException('Job not found')

    return job
  }
}

export const jobService = new JobService()
