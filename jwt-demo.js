const jwt = require('jsonwebtoken')

//const JWT_SECRET = process.env.JWT // can be any string (private)
const JWT_SECRET = "Secret code"

console.log('Secret: ', JWT_SECRET)

const payload = {
  name: 'Morgan',
  favNum: 3,
}

const token = jwt.sign(payload, JWT_SECRET) // when they log in create the token

console.log(token)

console.log('---------------')

const tokenValues = jwt.verify(token, JWT_SECRET) // every OTHER request take the clients token and decrypt it
console.log(tokenValues)
