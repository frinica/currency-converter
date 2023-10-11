import express, { Request, Response } from "express"
import { CountryData } from "../types/countryData"
import { authUser } from "../middleware"
import axios from "axios"

const router = express.Router()

// GET data about a country by name
router.get("/:name", authUser, async (req: Request, res: Response) => {
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

module.exports = router
