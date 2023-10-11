import { useState } from "react"
import axios from "axios"

interface Credentials {
  email: string
  password: string
}

export const Login = () => {
  const apiURL = process.env.REACT_APP_API_URL
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  })
  const { email, password } = credentials

  const onChange = (e: any) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(credentials)
  }

  const login = async (credentials: Credentials) => {
    try {
      const res = await axios.post(apiURL + "user/login", credentials)
      if (res.data) {
        localStorage.setItem("access_token", res.data)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section>
        <h2>SIGN IN</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </section>
    </>
  )
}
