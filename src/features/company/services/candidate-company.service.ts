import { prisma } from '~/prisma'
import { ICompany } from '../interfaces/company.interface'
import { NotFoundException } from '~/globals/cores/error.core'
import { Company, Prisma } from '@prisma/client'
import { getPagination, getPaginationMeta } from '~/globals/helpers/pagination.helper'
import { read } from 'fs'
import { companyRedis } from '~/globals/cores/redis/company.redis'

class CandidateCompanyService {
  public async createCompany(data: ICompany, userId: number) {
    const company = await prisma.company.create({
      data: {
        ...data,
        userId
      }
    })

    return company
  }

  public async readAll({ page = 1, limit = 10, filter }: { page?: number; limit?: number; filter?: string }) {
    const { skip, take } = getPagination(page, limit)

    const where = filter
      ? ({
          OR: [
            { name: { contains: filter, mode: 'insensitive' } },
            { description: { contains: filter, mode: 'insensitive' } }
          ]
        } as Prisma.CompanyWhereInput)
      : undefined

    const [data, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: limit
      }),
      prisma.company.count({ where })
    ])

    return {
      data,
      meta: getPaginationMeta(total, page, limit)
    }
  }

  async readOne(id: number, userId: number) {
    const companyKey = `company:${id}`
    const companyCached = await companyRedis.getCompanyFromRedis(companyKey)

    if (companyCached) {
      return companyCached
    }

    const company = await prisma.company.findUnique({ where: { id, userId } })
    if (!company) throw new NotFoundException('Company not found')

    await companyRedis.saveCompanyToRedis(companyKey, company)

    return company
  }

  public async readByUserId(userId: number) {
    return await prisma.company.findMany({ where: { userId } })
  }

  public async update(id: number, payload: Partial<Company>): Promise<Company> {
    const existing = await prisma.company.findUnique({ where: { id } })
    if (!existing) throw new NotFoundException('Company not found')

    return prisma.company.update({
      where: { id },
      data: payload
    })
  }

  public async approve(id: number, isApproved: boolean) {
    // await this.readOne(id)

    const company = await prisma.company.update({
      where: { id },
      data: { isApproved }
    })

    return company
  }
}

export const candidateCompanyService = new CandidateCompanyService()
