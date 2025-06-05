import { JobStatus } from '@prisma/client'

export interface IJob {
  id: number
  companyId: number
  title: string
  description: string
  minSalary: number
  maxSalary: number
  jobRoleName: string
  status: JobStatus
}
