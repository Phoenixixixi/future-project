import pool from '../config/database.js'
import { hashingPassword, validatePassword } from '../services/hashing.js'
import { createToken } from '../services/token.services.js'

export const register = async (req, res) => {
  const { name, password, email } = req.body
  const client = await pool.connect()

  if (!name || !password || !email) {
    res.status(400).json({
      message: 'please fill the blank input',
    })
    return
  }

  try {
    await client.query('BEGIN')
    const hashedPassword = await hashingPassword(password)

    const usersResult = await client.query(
      `
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            RETURNING id
        `,
      [name, email]
    )

    const user_id = usersResult.rows[0].id

    await client.query(
      `
            INSERT INTO auth_users (user_id, password)
            VALUES ($1, $2)
            
        `,
      [user_id, hashedPassword]
    )

    await client.query('COMMIT')

    res.status(201).json({
      message: 'user registered success',
    })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error(err)
    res.status(500).json({
      message: 'register failed',
    })
  } finally {
    client.release()
  }
}

export const login = async (req, res) => {
  let { name, email, password } = req.body

  if (!name || !password || !email) {
    res.status(400).json({
      message: 'please fill the blank input',
    })
    return
  }

  try {
    const loginResult = await pool.query(
      `
        SELECT u.id, u.name, u.email, au.password 
        FROM users u
        INNER JOIN auth_users au on u.id = au.user_id
        WHERE u.name = $1
        `,
      [name]
    )

    if (loginResult.rows.length === 0) {
      res.status(400).json({
        status: 400,
        message: "cannot find user or he hasn't register yet",
      })
      return
    }

    const db_password = loginResult.rows[0].password

    if (!(await validatePassword(password, db_password))) {
      res.status(400).json({
        status: 400,
        message: 'password is wrong ',
      })
      return
    }

    let { id } = loginResult.rows[0]

    const token = createToken({ id, name, email })

    res.status(200).json({ loginResult, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'error on the server side',
    })
  }
}
