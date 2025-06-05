import express from 'express'
import { packageController } from '../controllers/package.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const packageRouter = express.Router()

packageRouter.post('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.create))
packageRouter.get('/', verifyUser, allowAccess('ADMIN', 'RECRUITER'), asyncWrapper(packageController.readAll))
packageRouter.get('/:id', verifyUser, allowAccess('ADMIN', 'RECRUITER'), asyncWrapper(packageController.readOne))
packageRouter.patch('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.update))

export default packageRouter
