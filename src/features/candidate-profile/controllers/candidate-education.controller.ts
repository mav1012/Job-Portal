import { Request, Response } from 'express'
import { candidateEducationService } from '../services/candidate-education.service'
import HTTP_STATUS from '~/globals/constants/http.constant'

class CandidateEducationController {
  public async create(req: Request, res: Response) {
    const candidateEducation = await candidateEducationService.create(req.body, req.currentUser!)

    return res.status(200).json({
      message: 'Create candidate education successfully',
      data: candidateEducation
    })
  }

  public async readAll(req: Request, res: Response) {
    const candidateEducations = await candidateEducationService.readAll()

    return res.status(200).json({
      message: 'Get all candidate educations successfully',
      data: candidateEducations
    })
  }

  public async readMyEducations(req: Request, res: Response) {
    const candidateEducations = await candidateEducationService.readMyEducations(req.currentUser!)

    return res.status(200).json({
      message: 'Get my candidate educations successfully',
      data: candidateEducations
    })
  }

  public async update(req: Request, res: Response) {
    const educationId = parseInt(req.params.educationId)
    const updateData = req.body

    const updated = await candidateEducationService.update(educationId, updateData, req.currentUser!)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Education updated successfully',
      data: updated
    })
  }

  public async delete(req: Request, res: Response) {
    const educationId = parseInt(req.params.id)

    const deleted = await candidateEducationService.delete(educationId, req.currentUser!)

    return res.status(200).json({
      message: 'Education deleted successfully',
      data: deleted
    })
  }
}

export const candidateEducationController: CandidateEducationController = new CandidateEducationController()
