import { OrderStatus } from '@prisma/client'
import { packageService } from '~/features/package/services/package.service'
import { prisma } from '~/prisma'

class OrderService {
  public async create(packageId: number, currentUser: UserPayload) {
    const packageEntity = await packageService.readOne(packageId)

    const order = await prisma.order.create({
      data: {
        recruiterId: currentUser.id,
        packageId,
        totalPrice: packageEntity.price
      }
    })

    return order
  }

  public async read() {
    const orders = await prisma.order.findMany({})

    return orders
  }

  public async readMyOrders(currentUser: UserPayload) {
    const orders = await prisma.order.findMany({
      where: { recruiterId: currentUser.id }
    })

    return orders
  }

  public async updateStatus(orderId: number, status: OrderStatus) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    })

    return order
  }
}

export const orderService = new OrderService()
