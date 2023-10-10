import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import axios from "axios"
import { CountryData } from "./types/countryData"

dotenv.config({ path: "./src/config.env" })

const app: Application = express()

const port = process.env.PORT || 8001

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running!")
})

// Get data about a country by name
app.get("/country/:name", async (req: Request, res: Response) => {
  const countryName = req.params.name
  const countryData = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  )
  const filteredData: CountryData = {
    fullName: countryData.data[0].name.official,
    population: countryData.data[0].population,
    currencies: countryData.data[0].currencies,
    //exchangeRate: "exchange Rate",
  }

  res.send(filteredData)
})

app.listen(port, (): void => {
  console.log(`I am running in ${process.env.NODE_ENV} mode on port ${port}`)
})
