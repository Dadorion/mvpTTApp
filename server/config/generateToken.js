import jwt from 'jsonwebtoken'
import config from './config.js'

const generateAccessToken = (userId) => {
   const payload = {
      userId
   }
   return jwt.sign(payload, config.secret, {
      expiresIn: "2400h"
   })
}

export default generateAccessToken
