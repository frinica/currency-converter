import express, { Request, Response } from "express"
import dotenv from "dotenv"
import axios from "axios"
import { ExchangeRates } from "../types/exchangeRates"
import { authUser } from "../middleware"

dotenv.config({ path: "./server/config.env" })

const router = express.Router()

// GET latest exchange rates
// Note: Param "base" is not customizable with the free plan
router.get("/", authUser, async (req: Request, res: Response) => {
  const exchangeRatesData = await axios.get("http://data.fixer.io/api/latest", {
    params: {
      access_key: process.env.FIXER_API_KEY,
    },
  })
  const filteredExchangeRates: ExchangeRates = {
    base: exchangeRatesData.data.base,
    date: exchangeRatesData.data.date,
    rates: exchangeRatesData.data.rates,
  }
  res.send(filteredExchangeRates)
})

module.exports = router
