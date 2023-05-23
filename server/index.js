const express = require('express')
const app = express()
const path = require('path')
const volleyball = require('volleyball')

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(volleyball)

app.use('/api', require('./api'))

app.get('/help', (req, res) => {
  res.send('Running')
})

module.exports = app
