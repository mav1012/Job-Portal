import express from 'express'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import { industryController } from '../controllers/industry.controller'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const industryRouter = express.Router()

industryRouter.post('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(industryController.create))
industryRouter.get('/:id', asyncWrapper(industryController.readAll))

industryRouter.delete('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(industryController.remove))

export default industryRouter
