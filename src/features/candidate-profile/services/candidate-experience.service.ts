import { prisma } from '~/prisma'
import { IExperienceInput } from '../interfaces/experience.interface'
import { candidateProfileService } from './candidate-profile.service'

class CandidateExperienceService {
  public async create(currentUser: UserPayload, input: IExperienceInput) {
    const profile = await candidateProfileService.readById(currentUser.id)

    const experience = await prisma.experience.create({
      data: {
        ...input,
        candidateProfileId: profile.id
      }
    })

    return experience
  }

  public async getMyExperiences(currentUser: UserPayload) {
    const profile = await candidateProfileService.readById(currentUser.id)

    return await prisma.experience.findMany({
      where: { candidateProfileId: profile.id },
      orderBy: { startDate: 'desc' }
    })
  }

  public async getByCandidateProfileId(candidateProfileId: number) {
    return await prisma.experience.findMany({
      where: { candidateProfileId },
      orderBy: { startDate: 'desc' }
    })
  }

  public async deleteById(id: number) {
    await prisma.experience.delete({
      where: { id }
    })
  }
}

export const candidateExperienceService = new CandidateExperienceService()
