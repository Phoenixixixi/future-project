import express from 'express'
import pool from './config/database.js'
import { register, login } from './controller/login.controller.js'
import SignRouter from './routes/login.routes.js'
import MoneyRouter from './routes/money.routes.js'
import cors from 'cors'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded())
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
// app.get('/', (req, res) => {
//   res.send('testing')
// })

app.use('/login-page', SignRouter)
app.use('/money', MoneyRouter)

app.listen(port, () => {
  console.log('web server was running on port ' + port)
})
