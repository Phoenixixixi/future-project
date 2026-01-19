import pool from '../config/database.js'

export const inputMoney = async (req, res) => {
  const { user_id, balance, type } = req.body
  console.log(user_id, balance, type)

  if (!user_id || !balance || !type) {
    res.status(400).json({
      message: 'please fill the blank',
    })
    return
  }

  let type_balance

  switch (type.toUpperCase()) {
    case 'INCOME':
      type_balance = 1
      break
    case 'OUTCOME':
      type_balance = 2
      break
    default:
      console.log(type)
      return res.status(400).json({
        message: 'the type is unavailable',
      })
  }

  try {
    const checkingUserId = await pool.query(
      `SELECT id FROM users WHER-E id = $1`,
      [user_id]
    )

    if (checkingUserId.rows.length === 0) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    const userId = await checkingUserId.rows[0].id

    const result = await pool.query(
      `
            INSERT INTO money (user_id, balance, balance_category_id)
            VALUES ($1, $2, $3)

        `,
      [userId, balance, type_balance]
    )

    res.status(200).json({
      message: 'successfull input balance',
      status: 'success',
    })
  } catch (err) {
    res.status(500).json({
      message: 'input balance failed',
    })
    console.error(err)
  }
}

export const showMoney = async (req, res) => {
  const { user_id, start_date, end_date } = req.query
  if (!user_id) {
    res.status(400).json({
      message: 'user id is empty',
    })
    return
  }
  let query = `select * from money where user_id = $1`
  let params = [user_id]

  if (start_date && end_date) {
    query += `and created_at between $2 and $3`
    params.push(start_date, end_date)
  }

  try {
    const result = await pool.query(query, params)

    if (result.rows.length === 0) {
      res.status(400).json({
        success: false,
        message: 'please insert your money',
      })
    }

    res.status(200).json({
      message: 'successfull input balance',
      success: true,
      result: result.rows,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'failed to show data',
    })
    console.error(err)
  }
}
