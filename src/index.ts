import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"

dotenv.config({ path: "./src/config.env" })

const app: Application = express()

const port = process.env.PORT || 8001

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello from server!")
})

app.listen(port, (): void => {
  console.log(`I am running in ${process.env.NODE_ENV} mode on port ${port}`)
})
