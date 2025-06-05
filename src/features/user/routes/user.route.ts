import express from 'express'
import { userController } from '../controllers/user.controller'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware'
import { createUserSchema } from '../schemas/user.schema'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const userRouter = express.Router()

userRouter.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getAll))
userRouter.get('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getOne))
userRouter.post('/', allowAccess('ADMIN'), validateSchema(createUserSchema), asyncWrapper(userController.create))

userRouter.patch('/:id', verifyUser, asyncWrapper(userController.update))

userRouter.patch('/:id/password', verifyUser, asyncWrapper(userController.updatePassword))

export default userRouter
