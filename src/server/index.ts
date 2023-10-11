import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"

dotenv.config({ path: "./src/server/config.env" })

const app: Application = express()
const port = process.env.PORT || 8001
const userRouter = require("./routes/user")
const countryRouter = require("./routes/countryLookup")
const exchangeRatesRouter = require("./routes/exchangeRates")

app.use("/user", userRouter)
app.use("/country", countryRouter)
app.use("/currency", exchangeRatesRouter)

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running!")
})

app.listen(port, (): void => {
  console.log(`I am running in ${process.env.NODE_ENV} mode on port ${port}`)
})
