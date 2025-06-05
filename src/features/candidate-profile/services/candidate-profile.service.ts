import { CandidateProfile } from '@prisma/client'
import { NotFoundException } from '~/globals/cores/error.core'
import { prisma } from '~/prisma'
import { ICandidateProfile } from '../interfaces/candidate-profile.interface'

class CandidateProfileService {
  public async create(reqBody: ICandidateProfile, currentUser: UserPayload) {
    const { fullName, gender, phone, cv, birthdate, address } = reqBody

    const candidateProfile = await prisma.candidateProfile.create({
      data: {
        fullName,
        gender,
        phone,
        cv,
        birthdate: new Date(birthdate),
        address,
        userId: currentUser.id
      }
    })

    return candidateProfile
  }

  public async readAll(): Promise<CandidateProfile[]> {
    const candidates = await prisma.candidateProfile.findMany()

    return candidates
  }

  public async readById(id: number): Promise<CandidateProfile> {
    const candidate = await prisma.candidateProfile.findUnique({
      where: {
        id
      }
    })

    if (!candidate) throw new NotFoundException('Candidate not found')

    return candidate
  }

  public async update(id: number, updateData: any) {
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { id }
    })

    if (!existingProfile) throw new NotFoundException(`Candidate with ID ${id} not found`)

    const updatedProfile = await prisma.candidateProfile.update({
      where: { id },
      data: updateData
    })

    return updatedProfile
  }

  public async delete(id: number) {
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { id }
    })

    if (!existingProfile) {
      throw new NotFoundException(`Candidate profile with ID ${id} not found`)
    }

    await prisma.candidateProfile.delete({
      where: { id }
    })

    return { message: `Profile with ID ${id} deleted successfully` }
  }

  public async toggleOpenToWork(userId: number) {
    const candidate = await prisma.candidateProfile.findUnique({
      where: { userId }
    })

    if (!candidate) {
      throw new NotFoundException('Candidate profile not found')
    }

    const updatedProfile = await prisma.candidateProfile.update({
      where: { userId },
      data: {
        openToWork: !candidate.openToWork
      }
    })

    return updatedProfile
  }
}

export const candidateProfileService = new CandidateProfileService()
