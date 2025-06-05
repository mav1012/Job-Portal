import express from 'express'
import { jobController } from '../controllers/job.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'
import { createJobSchema, updateJobSchema } from '../schemas/job.schema'
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware'

const jobRouter = express.Router()

jobRouter.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(createJobSchema),
  asyncWrapper(jobController.create)
)
jobRouter.get('/', asyncWrapper(jobController.readAll))
jobRouter.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.readAll))
jobRouter.get('/:id', asyncWrapper(jobController.readOne))

jobRouter.patch(
  '/:id/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(updateJobSchema),
  asyncWrapper(jobController.update)
)
jobRouter.patch('/:id/:companyId/status', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobController.update))
jobRouter.delete('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.remove))

export default jobRouter
