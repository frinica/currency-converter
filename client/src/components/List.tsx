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
  const [exchangeRates, setExchangeRates] = useState<Object>({})
  const [filteredRates, setFilteredRates] = useState<any>()
  const [convertedArr, setConvertedArr] = useState<Object[]>([])
  const listArray = countriesInList.map((country: any) => (
    <tr key={country.fullName}>
      <td>{country.fullName}</td>
      <td>{country.population}</td>
      <td>{Object.keys(country.currencies)}</td>
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

    // Create a new array with only currency values
    list.forEach((item: any) => listCurrencies.push(item.currencies))

    // Create a filtered array with exchange rates for the countries that have been added to a list
    const filteredArr = ratesArr.filter((item) =>
      listCurrencies.some((obj) => Object.keys(obj).includes(item[0]))
    )

    setFilteredRates(filteredArr)
  }

  const currencyConverter = (amount: number | undefined, rates: any[]) => {
    let newArr: Object[] = []
    if (rates && amount) {
      rates.forEach((item: any, index: number) => {
        const convertedArr = {
          currency: rates[index][0],
          convertedAmount: Number((item[1] * amount).toFixed(2)),
        }
        newArr.push(convertedArr)
      })
    }
    if (newArr.length) {
      setConvertedArr(newArr)
    }
  }

  // Concat the arrays with country lookups and info about the converted amounts
  const concatArrays = (countriesInList: any[], convertedArr: any[]) => {
    let newArr: Object[] = []

    convertedArr.forEach((item) => {
      countriesInList.forEach((i) => {
        if (Object.keys(i.currencies).includes(item.currency)) {
          const values = {
            fullName: i.fullName,
            population: i.population,
            currencies: item.currency,
            convertedAmount: item.convertedAmount,
          }
          newArr.push(values)
        }
      })
    })

    if (newArr.length) {
      console.log(newArr)
    }
  }
  concatArrays(countriesInList, convertedArr)

  useEffect(() => {
    getExchangeRates()
    filterRates(countriesInList, exchangeRates)
  }, [countriesInList])

  useEffect(() => {
    currencyConverter(convertAmount, filteredRates)
  }, [convertAmount])

  return (
    <>
      <h3>List</h3>
      <table>
        <tr>
          <td>Full name</td>
          <td>Population</td>
          <td>Currencies</td>
        </tr>
        {listArray}
      </table>
      {JSON.stringify(convertedArr)}
    </>
  )
}
