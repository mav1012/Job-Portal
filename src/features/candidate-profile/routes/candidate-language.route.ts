import express from 'express'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { candidateLanguageController } from '../controllers/candidate-language.controller'

const candidateLanguageRouter = express.Router()

candidateLanguageRouter.post('/', verifyUser, asyncWrapper(candidateLanguageController.create))
candidateLanguageRouter.get('/', verifyUser, asyncWrapper(candidateLanguageController.readAll))
candidateLanguageRouter.get('/me', verifyUser, asyncWrapper(candidateLanguageController.readMyLanguages))
candidateLanguageRouter.patch('/:languageName', verifyUser, asyncWrapper(candidateLanguageController.updateLevel))
candidateLanguageRouter.delete('/:languageName', verifyUser, asyncWrapper(candidateLanguageController.remove))

export default candidateLanguageRouter
