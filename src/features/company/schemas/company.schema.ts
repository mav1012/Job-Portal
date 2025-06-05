import Joi from 'joi'

export const companyCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  teamSize: Joi.number().default(50),
  establishmentDate: Joi.date().required(),
  websiteUrl: Joi.string().uri().optional(),
  mapLink: Joi.string().optional(),
  address: Joi.string().optional()
})

export const companyUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  teamSize: Joi.number().optional(),
  establishmentDate: Joi.date().optional(),
  websiteUrl: Joi.string().uri().optional(),
  isApproved: Joi.boolean().optional(),
  mapLink: Joi.string().optional(),
  address: Joi.string().optional()
})
