import express from 'express'

import { inputMoney, showMoney } from '../controller/money.controller.js'

const router = express.Router()
router.post('/input-money', inputMoney)
router.get('/show-money', showMoney)

export default router
