import Joi from 'joi'

export const createExperienceSchema = Joi.object({
  company: Joi.string().required(),
  jobTitle: Joi.string().required(),
  location: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  description: Joi.string().optional()
})
