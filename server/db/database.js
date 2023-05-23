const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/jwt-bcrypt-demo', {
  logging: false,
})

module.exports = db
