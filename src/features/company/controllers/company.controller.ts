import { Request, Response } from 'express'

import HTTP_STATUS from '~/globals/constants/http.constant'
import { candidateCompanyService } from '../services/candidate-company.service'

class CandidateCompanyController {
  public async create(req: Request, res: Response) {
    const userId = req.currentUser.id

    const company = await candidateCompanyService.createCompany(req.body, userId)

    return res.status(201).json({
      message: 'Company created successfully',
      data: company
    })
  }

  public async readAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const filter = req.query.filter as string

    const result = await candidateCompanyService.readAll({ page, limit, filter })

    res.json({
      message: 'Companies fetched successfully',
      ...result
    })
  }

  public async update(req: Request, res: Response) {
    const companyId = parseInt(req.params.id)
    const payload = req.body

    const updated = await candidateCompanyService.update(companyId, payload)

    res.status(200).json({
      message: 'Company updated successfully',
      data: updated
    })
  }

  public async readOne(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const company = await candidateCompanyService.readOne(id)

    res.status(HTTP_STATUS.OK).json({
      message: 'Fetched company',
      data: company
    })
  }

  public async readMyCompanies(req: Request, res: Response) {
    const userId = req.currentUser.id
    const companies = await candidateCompanyService.readByUserId(userId)

    res.status(HTTP_STATUS.OK).json({
      message: 'Fetched your companies',
      data: companies
    })
  }

  public async approve(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const isApproved = req.body.isApproved

    const company = await candidateCompanyService.approve(id, isApproved)

    res.status(HTTP_STATUS.OK).json({
      message: 'Approved company successfully',
      data: company
    })
  }
}

export const candidateCompanyController = new CandidateCompanyController()
