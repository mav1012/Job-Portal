import { prisma } from '~/prisma'
import { jobService } from './job.service'

class JobSkillService {
  public async create(id: number, skillName: string, currentUser: UserPayload) {
    await jobService.findJobbyUser(id, currentUser.id)

    const jobSkill = await prisma.jobSkill.create({
      data: {
        jobId: id,
        skillName
      }
    })

    return jobSkill
  }

  public async read(id: number) {
    const jobSkills = await prisma.jobSkill.findMany({
      where: { jobId: id }
    })

    return jobSkills
  }

  public async remove(id: number, skillName: string, currentUser: UserPayload) {
    await jobService.findJobbyUser(id, currentUser.id)

    await prisma.jobSkill.delete({
      where: {
        jobId_skillName: {
          jobId: id,
          skillName
        }
      }
    })
  }
}

export const jobSkillService = new JobSkillService()
