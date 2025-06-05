import { Request, Response, NextFunction } from 'express'
import Joi, { Schema } from 'joi'
import HTTP_STATUS from '../constants/http.constant'

function formatError(error: Joi.ValidationError) {
  return error.details.map((detail) => detail.message)
}

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Validation Error',
        error: formatError(error)
      })
    }

    next()
  }
}
