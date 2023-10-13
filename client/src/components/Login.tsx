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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
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
      <section className="login">
        <h2>SIGN IN</h2>

        <form onSubmit={handleSubmit} className="loginForm">
          <div className="formItem">
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="formInput"
            />
          </div>
          <div className="formItem">
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="formInput"
            />
          </div>
          <button type="submit" className="button">
            Sign in
          </button>
        </form>
      </section>
    </>
  )
}
