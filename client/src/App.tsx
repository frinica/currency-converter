import React, { useEffect, useState } from "react"
import "./App.css"
import { Login } from "./components/Login"
import { Home } from "./components/Home"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [token, setToken] = useState<string>("")

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("access_token")
    if (token) {
      setIsLoggedIn(true)
      setToken(token)
    } else {
      setIsLoggedIn(false)
      setToken("")
    }
  }

  useEffect(() => {
    checkIfLoggedIn()
  })

  return (
    <div className="App">
      <main className="wrapper">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home props={token} />}
      </main>
    </div>
  )
}

export default App
