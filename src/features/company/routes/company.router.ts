import express from 'express'
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware'
import { companyCreateSchema, companyUpdateSchema } from '../schemas/company.schema'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import { candidateCompanyController } from '../controllers/company.controller'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { deserializeUser } from '~/globals/middlewares/deserialize.middleware'
import { incrementViews } from '~/globals/middlewares/incrementViews.middleware'
import { companyRedis } from '~/globals/cores/redis/company.redis'

const companyRouter = express.Router()

companyRouter.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(companyCreateSchema),
  candidateCompanyController.create
)

companyRouter.get('/', verifyUser, candidateCompanyController.readAll)
companyRouter.get('/mine', verifyUser, candidateCompanyController.readMyCompanies)

const companyViewsMiddleware = incrementViews(
  (id: string) => `company:${id}`,
  (id: string) => `company-views:${id}`,
  companyRedis.checkUserInSet.bind(companyRedis),
  companyRedis.incrementCompanyViews.bind(companyRedis),
  companyRedis.addMemberToSet.bind(companyRedis)
)

companyRouter.get('/:id', deserializeUser, companyViewsMiddleware, candidateCompanyController.readOne)

companyRouter.patch(
  '/:id',
  verifyUser,
  allowAccess('RECRUITER', 'ADMIN'),
  validateSchema(companyUpdateSchema),
  asyncWrapper(candidateCompanyController.update)
)

companyRouter.patch(
  '/approved/:id',
  verifyUser,
  allowAccess('ADMIN'),
  validateSchema(companyUpdateSchema),
  asyncWrapper(candidateCompanyController.approve)
)

export default companyRouter
