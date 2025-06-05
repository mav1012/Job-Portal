import express from 'express'
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware'
import { companyImageController } from '../controllers/company-image.controller'
import asyncWrapper from '~/globals/cores/asyncWrapper.core'
import { uploadCompanyImage } from '~/globals/helpers/upload.helper'

const imgRouter = express.Router()

imgRouter.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  uploadCompanyImage.array('images'),
  asyncWrapper(companyImageController.add)
)

imgRouter.get('/:companyId', verifyUser, asyncWrapper(companyImageController.readAll))

imgRouter.delete('/:companyId/images/:companyImageId', companyImageController.remove)

export default imgRouter
