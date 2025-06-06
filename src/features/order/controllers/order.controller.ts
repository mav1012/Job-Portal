import { Request, Response } from 'express'
import HTTP_STATUS from '~/globals/constants/http.constant'
import { orderService } from '../services/order.service'

class OrderController {
  public async read(req: Request, res: Response) {
    const orders = await orderService.read()

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get orders successfully',
      data: orders
    })
  }

  public async readMyOrders(req: Request, res: Response) {
    const orders = await orderService.readMyOrders(req.currentUser!)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get orders successfully',
      data: orders
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const order = await orderService.updateStatus(parseInt(req.params.id), req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update order status successfully',
      data: order
    })
  }
}

export const orderController = new OrderController()
