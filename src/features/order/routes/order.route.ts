import express from 'express'
import { orderController } from '../controllers/order.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const orderRouter = express.Router()

orderRouter.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(orderController.read))
orderRouter.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(orderController.readMyOrders))
orderRouter.patch('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(orderController.updateStatus))

export default orderRouter
