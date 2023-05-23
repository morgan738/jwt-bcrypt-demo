const Sequelize = require('sequelize')
const db = require('./database')
const bcrypt = require('bcrypt')

const User = db.define('user', {
  username: Sequelize.TEXT,
  password: Sequelize.TEXT,
})

User.beforeCreate(async (user) => {
  const SALT_ROUNDS = 12
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)

  user.password = hashedPassword
})

module.exports = User

User.prototype.comparePassword = async function (plainTextPw) {
  // console.log(this)
  const isValid = await bcrypt.compare(plainTextPw, this.password)
  console.log('Valid Password?', isValid)
  return isValid
}
