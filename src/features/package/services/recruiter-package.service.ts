import { orderService } from '~/features/order/services/order.service'
import { BadRequestException } from '~/globals/cores/error.core'
import { prisma } from '~/prisma'

class RecruiterPackageService {
  public async create(packageId: number, currentUser: UserPayload) {
    const existingPackage = await prisma.recruitersPackage.findFirst({
      where: {
        userId: currentUser.id,
        packageId: packageId,
        endDate: { gte: new Date() }
      }
    })

    if (existingPackage) {
      throw new BadRequestException('You already have an active subscription for this package.')
    }

    const startDate = new Date(Date.now())
    const clonedStartDate = new Date(Date.now())

    const endDate = new Date(clonedStartDate.setMonth(clonedStartDate.getMonth() + 1))

    const recruiterPackage = await prisma.recruitersPackage.create({
      data: {
        startDate,
        endDate,
        packageId,
        userId: currentUser.id
      }
    })

    await orderService.create(recruiterPackage.id, currentUser)

    return recruiterPackage
  }
}

export const recruiterPackageService = new RecruiterPackageService()
