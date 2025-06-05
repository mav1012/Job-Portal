import express from 'express'
import { applyController } from '../controllers/apply.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const applyRouter = express.Router()

applyRouter.post('/', verifyUser, allowAccess('CANDIDATE'), asyncWrapper(applyController.create))
applyRouter.get('/', verifyUser, allowAccess('CANDIDATE'), asyncWrapper(applyController.readMe))
applyRouter.get('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(applyController.readMeRecruiter))
applyRouter.patch('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(applyController.updateStatus))

export default applyRouter
