import jwt from 'jsonwebtoken'

export function generateToken(user: any): string {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT!
  )

  return accessToken
}
