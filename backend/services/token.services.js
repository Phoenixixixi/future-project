import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createToken = (id, name, email) => {
  const token = jwt.sign(
    {
      id,
      name,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  return token
}
