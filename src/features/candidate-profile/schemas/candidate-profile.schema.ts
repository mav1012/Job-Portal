import Joi from 'joi'

export const candidateProfileCreateSchema = Joi.object({
  fullName: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
  phone: Joi.string().required(),
  cv: Joi.string().required(),
  birthdate: Joi.string().isoDate().required(),
  address: Joi.string().required()
})

export const candidateProfileUpdateSchema = Joi.object({
  fullName: Joi.string().optional(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
  phone: Joi.string().optional(),
  cv: Joi.string().optional(),
  birthdate: Joi.string().isoDate().optional(),
  address: Joi.string().optional()
})
