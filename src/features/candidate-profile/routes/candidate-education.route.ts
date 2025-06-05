import express from 'express'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { candidateEducationController } from '../controllers/candidate-education.controller'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const candidateEducationRouter = express.Router()

candidateEducationRouter.post('/', verifyUser, asyncWrapper(candidateEducationController.create))
candidateEducationRouter.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateEducationController.readAll))
candidateEducationRouter.get('/me', verifyUser, asyncWrapper(candidateEducationController.readMyEducations))
candidateEducationRouter.patch('/:educationId', verifyUser, asyncWrapper(candidateEducationController.update))
candidateEducationRouter.delete('/:educationId', verifyUser, asyncWrapper(candidateEducationController.delete))

export default candidateEducationRouter
