import { ChangeEvent, useEffect, useState } from "react"

interface Credentials {
  email: string
  password: string
}

export const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  })

  const onChange = (e: any) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section>
        <h2>SIGN IN</h2>
      </section>
    </>
  )
}
