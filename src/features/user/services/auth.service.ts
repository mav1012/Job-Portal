import { prisma } from '~/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestException } from '~/globals/cores/error.core'
import { generateToken } from '~/globals/helpers/jwt.helper'

class AuthService {
  public async signUp(reqBody: any): Promise<any> {
    const { email, name, password } = reqBody

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    console.log('JWT secret is:', process.env.JWT)

    const accessToken = generateToken(user)
    return accessToken
  }

  public async signIn(reqBody: any): Promise<any> {
    const { email, password } = reqBody

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) throw new BadRequestException('User not found')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new BadRequestException('Invalid credentials')

    const accessToken = generateToken(user)
    return accessToken
  }
}

export const authService: AuthService = new AuthService()
