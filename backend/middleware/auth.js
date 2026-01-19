import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authLogin = async (req, res, next) => {
  const { token } = req.cookies.access_token

  if (!token) {
    return res.redirect('/login')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.redirect('/login')
  }
}
