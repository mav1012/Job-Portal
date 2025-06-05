import { Gender } from '@prisma/client'

export interface ICandidateProfile {
  fullName: string
  gender: Gender
  phone: string
  cv: string
  birthdate: Date
  address: string
}
