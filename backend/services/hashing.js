import bcrypt from 'bcrypt'

const saltRound = 13

export const hashingPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRound)
  return hash
}

export const validatePassword = async (password, db_pass) => {
  const isValidate = await bcrypt.compare(password, db_pass)
  return isValidate
}
