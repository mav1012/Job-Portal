import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'
import HTTP_STATUS from '~/globals/constants/http.constant'
import { sendTokentoCookie } from '~/globals/helpers/sendCookie.helper'

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.signUp(req.body)

    sendTokentoCookie(res, accessToken)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Sign up successfully',
      accessToken
    })
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.signIn(req.body)

    sendTokentoCookie(res, accessToken)

    return res.status(HTTP_STATUS.OK).json({ message: 'Sign in successfully' })
  }

  public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    return res.status(HTTP_STATUS.OK).json({
      message: 'Get current user successfully',
      data: req.currentUser
    })
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false
    })

    return res.status(HTTP_STATUS.OK).json({ message: 'Logout successfully' })
  }
}

export const authController: AuthController = new AuthController()
