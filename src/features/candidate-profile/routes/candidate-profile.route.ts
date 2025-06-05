import express from 'express'
import { candidateProfileController } from '../controllers/candidate-profile.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { checkPermission } from '~/globals/middlewares/checkpermission.middleware'
import { candidateProfileCreateSchema, candidateProfileUpdateSchema } from '../schemas/candidate-profile.schema'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware'

const candidateProfileRouter = express.Router()

candidateProfileRouter.post(
  '/',
  asyncWrapper(verifyUser),
  validateSchema(candidateProfileCreateSchema),
  asyncWrapper(candidateProfileController.create)
)
candidateProfileRouter.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateProfileController.readAll))
candidateProfileRouter.get(
  '/:id',
  verifyUser,
  checkPermission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.readOne)
)
candidateProfileRouter.patch(
  '/:id',
  verifyUser,
  validateSchema(candidateProfileUpdateSchema),
  checkPermission('candidateProfile', 'userId'),
  candidateProfileController.update
)
candidateProfileRouter.delete(
  '/:id',
  verifyUser,
  checkPermission('candidateProfile', 'userId'),
  candidateProfileController.delete
)
candidateProfileRouter.patch(
  '/toggle-open-to-work/:id',
  verifyUser,
  asyncWrapper(candidateProfileController.toggleOpenToWork)
)

export default candidateProfileRouter
