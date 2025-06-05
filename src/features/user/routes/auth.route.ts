import express from 'express'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { authController } from '../controllers/auth.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'

const authRouter = express.Router()

authRouter.post('/signup', asyncWrapper(authController.signUp))
authRouter.post('/signin', asyncWrapper(authController.signIn))
authRouter.get('/current-user', verifyUser, asyncWrapper(authController.getCurrentUser))
authRouter.get('/logout', verifyUser, asyncWrapper(authController.logout))

export default authRouter
