import { NextFunction, Request, Response } from 'express'
import { candidateExperienceService } from '../services/candidate-experience.service'
import { NotFoundException } from '~/globals/cores/error.core'

class CandidateExperienceController {
  public async create(req: Request, res: Response) {
    const experience = await candidateExperienceService.create(req.currentUser, req.body)

    return res.status(201).json({
      message: 'Experience added successfully',
      data: experience
    })
  }

  public async getMyExperiences(req: Request, res: Response) {
    const experiences = await candidateExperienceService.getMyExperiences(req.currentUser)

    res.status(200).json({
      message: 'Experiences fetched successfully',
      data: experiences
    })
  }

  public async getByCandidateProfileId(req: Request, res: Response) {
    const candidateProfileId = parseInt(req.params.id)

    const experiences = await candidateExperienceService.getByCandidateProfileId(candidateProfileId)
    res.status(200).json({
      message: 'Candidate experience fetched successfully',
      data: experiences
    })
  }

  public async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    await candidateExperienceService.deleteById(id)

    res.status(200).json({
      message: 'Experience deleted successfully'
    })
  }
}

export const candidateExperienceController = new CandidateExperienceController()
