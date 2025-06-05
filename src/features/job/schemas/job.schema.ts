import Joi from 'joi'

export const createJobSchema = Joi.object({
  companyId: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  minSalary: Joi.number().required(),
  maxSalary: Joi.number().required(),
  jobRoleName: Joi.string().required()
})

export const updateJobSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  minSalary: Joi.number().optional(),
  maxSalary: Joi.number().optional()
})
