import express from 'express'
import { jobBenefitController } from '../controllers/job-benefit.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'

const jobBenefitRouter = express.Router()

jobBenefitRouter.post('/', verifyUser, asyncWrapper(jobBenefitController.create))
jobBenefitRouter.get('/:jobId', asyncWrapper(jobBenefitController.read))

jobBenefitRouter.delete('/:jobId/:benefitName', verifyUser, asyncWrapper(jobBenefitController.remove))

export default jobBenefitRouter
