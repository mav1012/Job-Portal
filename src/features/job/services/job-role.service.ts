import { NotFoundException } from '~/globals/cores/error.core'
import { getPagination, getPaginationMeta } from '~/globals/helpers/pagination.helper'
import { prisma } from '~/prisma'

class JobRoleService {
  public async create(name: string) {
    const jobRole = await prisma.jobRole.create({
      data: {
        name
      }
    })

    return jobRole
  }

  public async readAll(page = 1, limit = 10) {
    const { skip, take } = getPagination(page, limit)

    const [data, total] = await Promise.all([
      prisma.jobRole.findMany({
        skip,
        take,
        orderBy: { name: 'asc' }
      }),
      prisma.jobRole.count()
    ])

    const meta = getPaginationMeta(total, page, limit)

    return { data, meta }
  }

  public async remove(name: string) {
    const role = await prisma.jobRole.findUnique({ where: { name } })
    if (!role) throw new NotFoundException('Job role not found')

    await prisma.jobRole.delete({ where: { name } })
  }

  public async readOne(name: string) {
    const role = await prisma.jobRole.findUnique({ where: { name } })
    if (!role) throw new NotFoundException('Job role not found')

    return role
  }
}

export const jobRoleService = new JobRoleService()
