import { useState, useEffect } from "react"
import axios from "axios"

export const List = ({
  props,
  userToken,
  amount,
}: {
  props: Object[]
  userToken: string
  amount: number | undefined
}) => {
  const countriesInList = props
  const token = userToken
  const convertAmount = amount

  const apiURL = process.env.REACT_APP_API_URL
  const [countries, setCountries] = useState(countriesInList)
  const [exchangeRates, setExchangeRates] = useState<Object>({})
  const [filteredRates, setFilteredRates] = useState<any>()

  // Render a table with countries in the list
  const countriesArray = countries.map((country: any, index: number) => (
    <tr key={country[index]}>
      <td>{country.fullName}</td>
      <td>{country.population}</td>
      <td>{Object.keys(country.currencies)}</td>
      {country.convertAmount ? <td>{country.convertAmount}</td> : <td></td>}
    </tr>
  ))

  const getExchangeRates = async () => {
    try {
      const res = await axios.get(apiURL + "currency", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data) {
        setExchangeRates(res.data.rates)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterRates = (list: Object[], rates: Object) => {
    const ratesArr = Object.entries(rates)
    let listCurrencies: string[] = []

    // Create a new array with only the currency values
    list.forEach((item: any) => listCurrencies.push(item.currencies))

    // Create a filtered array with exchange rates for the countries that have been added to a list
    const filteredArr = ratesArr.filter((item) => {
      return listCurrencies.some((obj) => Object.keys(obj).includes(item[0]))
    })
    setFilteredRates(filteredArr)
  }

  // Use filtered rates and the inputed amount to convert to set a new countries array with converted amount values
  const currencyConverter = (
    amount: number | undefined,
    rates: any[],
    countriesArr: any[]
  ) => {
    let newArr: Object[] = []
    let amountInSEK: number = 0
    if (amount) {
      amountInSEK = amount / 11.542656
    } // Convert received EUR to SEK

    if (rates && amountInSEK) {
      rates.forEach((item: any) => {
        countriesArr.forEach((i, index) => {
          if (Object.keys(i.currencies).includes(item[0])) {
            const value = Number((item[1] * amountInSEK).toFixed(2)) // Multiply the exchange rate with the amount and round down to 2 decimals
            const updatedVals = { ...countriesArr[index], convertAmount: value }
            newArr.push(updatedVals)
          }
        })
      })
    }
    if (newArr.length) {
      setCountries(newArr)
    }
  }

  useEffect(() => {
    setCountries(countriesInList)
  }, [countriesInList])

  useEffect(() => {
    getExchangeRates()
    filterRates(countries, exchangeRates)
  }, [countries])

  useEffect(() => {
    currencyConverter(convertAmount, filteredRates, countries)
  }, [convertAmount])

  return (
    <>
      <section className="sectionWrapper">
        <h3>List</h3>
        <table className="listTable">
          <tr>
            <th>Full name</th>
            <th>Population</th>
            <th>Currencies</th>
            <th>Converted amount</th>
          </tr>
          {countriesArray}
        </table>
      </section>
    </>
  )
}
