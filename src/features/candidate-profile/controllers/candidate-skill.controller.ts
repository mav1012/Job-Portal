import { Request, Response } from 'express'
import { candidateSkillService } from '../services/candidate-skill.service'

class CandidateSkillController {
  public async addSkill(req: Request, res: Response) {
    const { skillName } = req.body

    const result = await candidateSkillService.addSkillToCandidate(skillName, req.currentUser)

    return res.status(201).json({
      message: 'Skill added to candidate successfully',
      data: result
    })
  }

  public async getMySkills(req: Request, res: Response) {
    const skills = await candidateSkillService.getSkillsByCandidateId(req.currentUser)

    return res.status(200).json({
      message: 'Skills fetched successfully',
      data: skills
    })
  }

  public async removeSkill(req: Request, res: Response) {
    const { skill } = req.body

    await candidateSkillService.deleteSkill(skill, req.currentUser)

    return res.status(200).json({
      message: `${skill} removed successfully from your skills.`
    })
  }
}

export const candidateSkillController: CandidateSkillController = new CandidateSkillController()
