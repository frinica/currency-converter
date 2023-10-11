import { useState } from "react"
import axios from "axios"

export const Search = ({ props }: { props: string }) => {
  const token = props
  const apiURL = process.env.REACT_APP_API_URL
  const [searchTerm, setSearchTerm] = useState<string>("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    lookupCountry(searchTerm)
  }

  const lookupCountry = async (country: string) => {
    try {
      const res = await axios.get(apiURL + `country/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data) {
        console.log(res.data)
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
    </>
  )
}
