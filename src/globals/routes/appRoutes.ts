import { Application } from 'express'
import userRouter from '../../features/user/routes/user.route'
import authRouter from '~/features/user/routes/auth.route'
import candidateProfileRouter from '~/features/candidate-profile/routes/candidate-profile.route'
import candidateLanguageRouter from '~/features/candidate-profile/routes/candidate-language.route'
import candidateEducationRouter from '~/features/candidate-profile/routes/candidate-education.route'
import candidateSkillRouter from '~/features/candidate-profile/routes/candidate-skill.router'
import companyRouter from '~/features/company/routes/company.router'
import jobRoleRouter from '~/features/job/routes/job-role.route'
import jobRouter from '~/features/job/routes/job.route'
import jobSkillRouter from '~/features/job/routes/job-skill.route'
import jobBenefitRouter from '~/features/job/routes/job-benefit.route'
import applyRouter from '~/features/apply/routes/apply.route'
import packageRouter from '~/features/package/routes/package.route'
import recruiterPackageRouter from '~/features/package/routes/recruiter-package.route'
import orderRouter from '~/features/order/routes/order.route'

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/candidate-profile', candidateProfileRouter)
  app.use('/api/v1/candidate-language', candidateLanguageRouter)
  app.use('/api/v1/candidate-education', candidateEducationRouter)
  app.use('/api/v1/candidate-skill', candidateSkillRouter)
  app.use('/api/v1/company', companyRouter)
  app.use('/api/v1/job-role', jobRoleRouter)
  app.use('/api/v1/job', jobRouter)
  app.use('/api/v1/job-skills', jobSkillRouter)
  app.use('/api/v1/job-benefits', jobBenefitRouter)
  app.use('/api/v1/apply', applyRouter)
  app.use('/api/v1/package', packageRouter)
  app.use('/api/v1/recruiter-package', recruiterPackageRouter)
  app.use('/api/v1/orders', orderRouter)
}

export default appRoutes
