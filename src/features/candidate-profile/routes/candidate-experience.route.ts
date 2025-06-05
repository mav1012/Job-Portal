import { Router } from 'express'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import { createExperienceSchema } from '../schemas/experience.schema'
import { candidateExperienceController } from '../controllers/candidate-experience.controller'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const experienceRouter = Router()

experienceRouter.post(
  '/',
  verifyUser,
  validateSchema(createExperienceSchema),
  asyncWrapper(candidateExperienceController.create)
)

experienceRouter.get('/my-experiences', verifyUser, candidateExperienceController.getMyExperiences)

experienceRouter.get(
  '/candidate/:id',
  verifyUser,
  allowAccess('ADMIN', 'RECRUITER'),
  candidateExperienceController.getByCandidateProfileId
)

experienceRouter.delete('/:id', verifyUser, candidateExperienceController.deleteById)

export default experienceRouter
