import { prisma } from '~/prisma'
import { candidateProfileService } from './candidate-profile.service'
import { NotFoundException } from '~/globals/cores/error.core'
import { CandidateEducation, CandidateProfile } from '@prisma/client'

class CandidateEducationService {
  public async create(reqBody: any, currentUser: UserPayload) {
    const { educationId, major, degree, yearStart, yearEnd } = reqBody

    const profile = await candidateProfileService.readById(currentUser.id)

    await this.findEducation(educationId)

    const candidateEducation = await prisma.candidateEducation.create({
      data: {
        candidateProfileId: profile.id,
        educationId,
        major,
        degree,
        yearStart,
        yearEnd
      }
    })

    return candidateEducation
  }

  private async findEducation(educationId: number) {
    const education = await prisma.education.findUnique({
      where: {
        id: educationId
      }
    })

    if (!education) throw new NotFoundException('Education not found')
  }

  public async readAll() {
    const candidateEducations: CandidateEducation[] = await prisma.candidateEducation.findMany()

    return candidateEducations
  }

  public async readMyEducations(currentUser: UserPayload) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    const candidateEducations: CandidateEducation[] = await prisma.candidateEducation.findMany({
      where: {
        candidateProfileId: profile.id
      }
    })

    return candidateEducations
  }

  public async update(educationId: number, data: Partial<any>, currentUser: UserPayload) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    const existing = await prisma.candidateEducation.findUnique({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId: profile.id,
          educationId
        }
      }
    })

    if (!existing) throw new NotFoundException('Education record not found')

    const updated = await prisma.candidateEducation.update({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId: profile.id,
          educationId
        }
      },
      data
    })

    return updated
  }

  public async delete(educationId: number, currentUser: UserPayload) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    await prisma.candidateEducation.delete({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId: profile.id,
          educationId: educationId
        }
      }
    })
  }
}

export const candidateEducationService: CandidateEducationService = new CandidateEducationService()
