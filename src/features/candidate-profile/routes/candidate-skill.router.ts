// candidate-skill.route.ts
import express from 'express'
import { candidateSkillController } from '../controllers/candidate-skill.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'

const candidateSkillRouter = express.Router()

candidateSkillRouter.post('/skills', verifyUser, asyncWrapper(candidateSkillController.addSkill))
candidateSkillRouter.get('/skills', candidateSkillController.getMySkills)
candidateSkillRouter.delete('/', verifyUser, asyncWrapper(candidateSkillController.removeSkill))

export default candidateSkillRouter
