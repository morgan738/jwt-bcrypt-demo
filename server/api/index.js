const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../db')
const { JWT } = require('../../secrets')

router.post('/signup', async (req, res, next) => {
  // Take in the username and password, and then I want to hash the password BEFORE inserting it into the DB
  let [foundUser] = await User.findAll({
    where: { username: req.body.username },
  })

  if (!foundUser) {
    await User.create(req.body)
  }
  res.send('hello')
})

router.post('/login', async (req, res, next) => {
  // log in the client and give them a token
  console.log(req.body)

  // if they are a valid user and the passwords match
  try {
    let [foundUser] = await User.findAll({
      where: { username: req.body.username },
    })
    if (foundUser) {
      // Validate that they have the right password
      if (await foundUser.comparePassword(req.body.password)) {
        let payload = { id: foundUser.id }
        let token = jwt.sign(payload, JWT)
        return res.send({ payload, token })
      } else {
        return res.status(401).send('Invalid Password')
      }
    } else {
      return res.status(404).send('NO USER')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res) => {
  // this route returns info about the client making the request
  //   console.log(req.headers.authorization)
  const token = req.headers.authorization

  const payload = jwt.verify(token, JWT)
  const { id } = payload

  res.send(await User.findByPk(id))
})

module.exports = router
