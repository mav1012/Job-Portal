import { BadRequestException } from '~/globals/cores/error.core'
import { prisma } from '~/prisma'

class SubscriptionGuardService {
  //  Main validation method
  public async validateJobPostLimit(currentUser: UserPayload) {
    // 1️⃣ Get active subscription
    const activePackage = await prisma.recruitersPackage.findFirst({
      where: {
        userId: currentUser.id,
        endDate: { gte: new Date() }
      }
    })

    if (!activePackage) {
      throw new BadRequestException('No active subscription found. Please purchase a package.')
    }

    // 2️⃣ Count how many jobs user already posted in current subscription
    const jobsCount = await prisma.job.count({
      where: {
        postById: currentUser.id,
        createdAt: { gte: activePackage.startDate },
        isDeleted: false
      }
    })

    // 3️⃣ Get the package entity to check jobPostLimit
    const packageEntity = await prisma.package.findUnique({
      where: { id: activePackage.packageId }
    })

    if (!packageEntity) {
      throw new BadRequestException('Invalid package configuration.')
    }

    // 4️⃣ Compare and validate
    if (jobsCount >= packageEntity.jobPostLimit) {
      throw new BadRequestException('Job posting limit reached for your subscription package.')
    }
  }
}

export const subscriptionGuardService = new SubscriptionGuardService()
