import { useState } from "react"
import axios from "axios"

export const Search = ({
  userToken,
  dataFromChild,
}: {
  userToken: string
  dataFromChild: (arg: Object) => void
}) => {
  interface countryData {
    fullName: string
    population: number | null
    currencies: Object
  }

  const initCountry: countryData = {
    fullName: "",
    population: null,
    currencies: { "": { name: "", symbol: "" } },
  }
  const token = userToken
  const apiURL = process.env.REACT_APP_API_URL
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [country, setCountry] = useState<countryData>(initCountry)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    lookupCountry(searchTerm)
  }

  const lookupCountry = async (country: string) => {
    try {
      const res = await axios.get(apiURL + `country/${country}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data) {
        setCountry(res.data)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Look up a country</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={onChange}
        />
        <button type="submit">Search</button>
      </form>

      <section>
        <h3>Results</h3>
        <table>
          <tr>
            <td>Full name</td>
            <td>Population</td>
            <td>Currencies</td>
            <td></td>
          </tr>
          <td>{country.fullName}</td>
          <td>{country.population}</td>
          <td>{Object.keys(country.currencies)}</td>
          <td>
            <button onClick={() => dataFromChild(country)}>Add to list</button>
          </td>
        </table>
      </section>
    </>
  )
}
