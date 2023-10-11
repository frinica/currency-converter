// LOGIN user
import express, { Request, Response } from "express"
import { getJWT } from "../utils"

const router = express.Router()
const users = require("../data").userDB
/* const bodyParser = require("body-parser")
const urlEncodedParser = bodyParser.urlencoded({ extended: false }) */

router.post("/login", async (req: Request, res: Response) => {
  try {
    let userExists = users.find((data: any) => req.body.email === data.email)
    if (userExists) {
      let passwordInput = req.body.password
      let passwordStored = userExists.password
      const passwordMatch = passwordInput === passwordStored
      if (passwordMatch) {
        const token = getJWT(req.body.email)
        res.status(200).send(token)
      } else {
        console.log("ERROR IN USER ROUTE")
        res.status(400).send("Invalid email or password")
      }
    } else {
      console.log("ERROR IN USER ROUTE")
      res.status(400).send("Invalid email or password")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error")
  }
})

module.exports = router
