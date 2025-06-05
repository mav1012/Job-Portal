import express from 'express'
import { recruiterPackageController } from '../controllers/recruiter-package.controller'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'

const recruiterPackageRouter = express.Router()

recruiterPackageRouter.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(recruiterPackageController.create))

export default recruiterPackageRouter
