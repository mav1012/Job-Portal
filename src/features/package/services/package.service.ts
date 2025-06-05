import { prisma } from '~/prisma'

class PackageService {
  public async create(requestBody: any) {
    const { label, price, jobPostLimit } = requestBody

    const packageEntity = await prisma.package.create({
      data: {
        label,
        price,
        jobPostLimit
      }
    })

    return packageEntity
  }

  public async readAll() {
    const packages = await prisma.package.findMany({
      where: { isActive: true }
    })

    return packages
  }

  public async readOne(id: number) {
    const packageEntity = await prisma.package.findUnique({ where: { id } })

    if (!packageEntity) throw new Error('Package not found')

    return packageEntity
  }

  public async update(id: number, requestBody: any) {
    const { label, price, jobPostLimit } = requestBody

    const packageEntity = await prisma.package.update({
      where: { id },
      data: {
        label,
        price,
        jobPostLimit
      }
    })

    return packageEntity
  }

  public async updateStatus(id: number, active: boolean) {
    const packageEntity = await prisma.package.update({
      where: { id },
      data: {
        isActive: active
      }
    })

    return packageEntity
  }
}

export const packageService = new PackageService()
