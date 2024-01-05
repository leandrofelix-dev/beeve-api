import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../repositories/authRepository'

export async function authUseCase(
  email: string,
  password: string,
  secret: string | undefined,
) {
  const user = await findUserByEmail(email)

  if (!user) throw new Error('Invalid username or password')
  const hash = user.passwordHash
  const passwordMatch = await bcrypt.compare(password, hash)
  if (!passwordMatch) throw new Error('Invalid username or password')

  return jwt.sign({ userId: user.id }, String(secret))
}
