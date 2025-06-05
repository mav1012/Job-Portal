import express from 'express'
import { jobRoleController } from '../controllers/job-role.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'

const jobRoleRouter = express.Router()

jobRoleRouter.post('/', verifyUser, asyncWrapper(jobRoleController.create))
jobRoleRouter.get('/', asyncWrapper(jobRoleController.readAll))

// jobRoleRouter.delete('/:jobRoleId', verifyUser, asyncWrapper(jobRoleController.remove))

export default jobRoleRouter
