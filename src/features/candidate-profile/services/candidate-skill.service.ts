import { prisma } from '~/prisma'
import { candidateProfileService } from './candidate-profile.service'

class CandidateSkillService {
  public async addSkillToCandidate(skillName: string, currentUser: UserPayload) {
    const skill = await prisma.skill.findUnique({ where: { name: skillName } })
    if (!skill) throw new Error('Skill not found')

    const profile = await candidateProfileService.readById(currentUser.id)

    const candidateSkill = await prisma.candidateSkill.create({
      data: {
        candidateProfileId: profile.id,
        skillName: skillName
      }
    })

    return candidateSkill
  }

  public async getSkillsByCandidateId(currentUser: UserPayload) {
    const profile = await candidateProfileService.readById(currentUser.id)

    const skills = await prisma.candidateSkill.findMany({
      where: { candidateProfileId: profile.id },
      include: {
        skill: true // pulls the full skill details
      }
    })

    return skills
  }

  public async deleteSkill(skillName: string, currentUser: UserPayload) {
    const profile = await candidateProfileService.readById(currentUser.id)

    await prisma.candidateSkill.delete({
      where: {
        candidateProfileId_skillName: {
          candidateProfileId: profile.id,
          skillName
        }
      }
    })
  }
}

export const candidateSkillService: CandidateSkillService = new CandidateSkillService()
