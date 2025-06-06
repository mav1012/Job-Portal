import { Request, Response } from 'express'
import { candidateProfileService } from '../services/candidate-profile.service'
import HTTP_STATUS from '~/globals/constants/http.constant'
import { parse } from 'path'
import { ICandidateProfile } from '../interfaces/candidate-profile.interface'

class CandidateProfileController {
  public async create(req: Request, res: Response) {
    const profile: ICandidateProfile = await candidateProfileService.create(req.body, req.currentUser!)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create profile successfully',
      data: profile
    })
  }

  public async readAll(req: Request, res: Response) {
    const candidates = await candidateProfileService.readAll()

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidates',
      data: candidates
    })
  }

  public async readOne(req: Request, res: Response) {
    const candidate = await candidateProfileService.readById(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one candidate successfully',
      data: candidate
    })
  }

  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const updatedProfile = await candidateProfileService.update(id, req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Candidate profile updated successfully',
      data: updatedProfile
    })
  }

  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const result = await candidateProfileService.delete(id)

    return res.status(HTTP_STATUS.OK).json({
      message: result.message
    })
  }

  public async toggleOpenToWork(req: Request, res: Response) {
    const userId = req.currentUser!.id

    const updatedProfile = await candidateProfileService.toggleOpenToWork(userId)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Open to work status toggled successfully',
      data: updatedProfile
    })
  }
}

export const candidateProfileController = new CandidateProfileController()
