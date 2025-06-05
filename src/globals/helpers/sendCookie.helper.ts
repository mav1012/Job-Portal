import { Response } from 'express'

export function sendTokentoCookie(res: Response, accessToken: string) {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: false
  })
}
