import { Education, Language, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }]

  await prisma.language.createMany({
    data
  })
}

async function createEducationData() {
  const data = [
    { name: 'IIT Bombay', map: 'https://maps.google.com/.../iitbombay' },
    { name: 'NIT Trichy', map: 'https://maps.google.com/.../nitt' },
    { name: 'DU', map: 'https://maps.google.com/.../du' }
  ]

  await prisma.education.createMany({
    data
  })
}

async function createIndustryData() {
  const data = [{ name: 'Software' }, { name: 'Hardware' }, { name: 'Design' }]

  await prisma.industry.createMany({
    data
  })
}

async function createSkillData() {
  const data = [{ name: 'React' }, { name: 'Node.js' }, { name: 'Next.js' }]

  await prisma.skill.createMany({
    data
  })
}

async function createJobData() {
  const data = [{ name: 'Software Engineer' }, { name: 'Hardware Engineer' }, { name: 'Design Engineer' }]

  await prisma.jobRole.createMany({
    data
  })
}

async function createBenefits() {
  const data = [{ name: 'Health Insurance' }, { name: 'Dental Insurance' }, { name: 'Life Insurance' }]

  await prisma.benefit.createMany({
    data
  })
}

createBenefits()
  .then(() => {
    console.log('✅ Seed completed successfully')
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err)
  })
  .finally(async () => {
    await prisma.$disconnect() // Cleanup DB connection
  })
