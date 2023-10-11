import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import axios from "axios"
import { CountryData } from "./types/countryData"
import { ExchangeRates } from "./types/exchangeRates"
import { getJWT } from "./utils"
import { authUser } from "./middleware"

dotenv.config({ path: "./src/server/config.env" })

const users = require("./data").userDB
const bodyParser = require("body-parser")
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
const app: Application = express()
const port = process.env.PORT || 8001

/* app.use(bodyParser.urlencoded({ extended: false })) */

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running!")
})

// GET data about a country by name
app.get("/country/:name", authUser, async (req: Request, res: Response) => {
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
app.get("/currency", authUser, async (req: Request, res: Response) => {
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

// LOGIN user
app.post("/login", urlEncodedParser, async (req: Request, res: Response) => {
  try {
    let userExists = users.find((data: any) => req.body.email === data.email)
    if (userExists) {
      let passwordInput = req.body.password
      let passwordStored = userExists.password
      const passwordMatch = passwordInput === passwordStored
      if (passwordMatch) {
        const token = getJWT(req.body.email)
        res.status(200).send(token)
      } else {
        res.status(400).send("Invalid email or password")
      }
    } else {
      res.status(400).send("Invalid email or password")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error")
  }
})

app.listen(port, (): void => {
  console.log(`I am running in ${process.env.NODE_ENV} mode on port ${port}`)
})
