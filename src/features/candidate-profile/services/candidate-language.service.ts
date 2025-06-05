import { CandidateLanguage, CandidateProfile, Level } from '@prisma/client'
import { prisma } from '~/prisma'
import { candidateProfileService } from './candidate-profile.service'

class CandidateLanguageService {
  public async create(reqBody: any, currentUser: UserPayload) {
    const { language, level } = reqBody

    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    const candidateLanguage = await prisma.candidateLanguage.create({
      data: {
        candidateProfileId: profile.id,
        languageName: language,
        level
      }
    })

    return candidateLanguage
  }

  public async readAll() {
    const candidateLanguages: CandidateLanguage[] = await prisma.candidateLanguage.findMany()

    return candidateLanguages
  }

  public async readMyLanguages(currentUser: UserPayload) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    const candidateLanguages: CandidateLanguage[] = await prisma.candidateLanguage.findMany({
      where: {
        candidateProfileId: profile.id
      }
    })

    return candidateLanguages
  }

  public async updateLevel(currentUser: UserPayload, language: string, level: Level) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    const candidateLanguage = await prisma.candidateLanguage.update({
      where: {
        candidateProfileId_languageName: {
          candidateProfileId: profile.id,
          languageName: language
        }
      },
      data: {
        level
      }
    })

    return candidateLanguage
  }

  public async remove(currentUser: UserPayload, language: string) {
    const profile: CandidateProfile = await candidateProfileService.readById(currentUser.id)

    await prisma.candidateLanguage.delete({
      where: {
        candidateProfileId_languageName: {
          candidateProfileId: profile.id,
          languageName: language
        }
      }
    })
  }
}

export const candidateLanguageService: CandidateLanguageService = new CandidateLanguageService()
