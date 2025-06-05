import express from 'express'
import { jobSkillController } from '../controllers/job-skill.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'

const jobSkillRouter = express.Router()

jobSkillRouter.post('/', verifyUser, asyncWrapper(jobSkillController.create))
jobSkillRouter.get('/:id', asyncWrapper(jobSkillController.read))
jobSkillRouter.delete('/:id', verifyUser, asyncWrapper(jobSkillController.remove))

export default jobSkillRouter
