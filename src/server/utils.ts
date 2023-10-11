import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "./src/server/config.env" })

const jwtSecret = process.env.JWT_SECRET || ""

export function getJWT(email: string) {
  const token = jwt.sign(email, jwtSecret)

  return token
}

export function verifyDecodeJWT(token: string) {
  try {
    const userData = jwt.verify(token, jwtSecret)
    return userData
  } catch {
    return false
  }
}
