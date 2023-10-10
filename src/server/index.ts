import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import axios from "axios"
import { CountryData } from "./types/countryData"
import { ExchangeRates } from "./types/exchangeRates"

dotenv.config({ path: "./src/server/config.env" })

const app: Application = express()

const port = process.env.PORT || 8001

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running!")
})

// GET data about a country by name
app.get("/country/:name", async (req: Request, res: Response) => {
  const countryName = req.params.name
  const countryData = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  )
  const filteredData: CountryData = {
    fullName: countryData.data[0].name.official,
    population: countryData.data[0].population,
    currencies: countryData.data[0].currencies,
  }

  res.send(filteredData)
})

// GET latest exchange rates
// Note: Param "base" is not customizable with the free plan
app.get("/currency", async (req: Request, res: Response) => {
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

app.listen(port, (): void => {
  console.log(`I am running in ${process.env.NODE_ENV} mode on port ${port}`)
})
