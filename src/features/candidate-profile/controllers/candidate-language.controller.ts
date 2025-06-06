import { Request, Response } from 'express'
import { candidateLanguageService } from '../services/candidate-language.service'

class CandidateLanguageController {
  public async create(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.create(req.body, req.currentUser!)

    return res.status(200).json({
      message: 'Create candidate language successfully',
      data: candidateLanguage
    })
  }

  public async readAll(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readAll()

    return res.status(200).json({
      message: 'Get all candidate languages successfully',
      data: candidateLanguages
    })
  }

  public async readMyLanguages(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readMyLanguages(req.currentUser!)

    return res.status(200).json({
      message: 'Get my candidate languages successfully',
      data: candidateLanguages
    })
  }

  public async updateLevel(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.updateLevel(
      req.currentUser!,
      req.params.languageName,
      req.body.level
    )

    return res.status(200).json({
      message: 'Update candidate language successfully',
      data: candidateLanguage
    })
  }

  public async remove(req: Request, res: Response) {
    await candidateLanguageService.remove(req.currentUser!, req.params.languageName)

    return res.status(200).json({
      message: 'Delete candidate language successfully'
    })
  }
}

export const candidateLanguageController: CandidateLanguageController = new CandidateLanguageController()
