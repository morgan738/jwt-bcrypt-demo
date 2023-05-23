const { db, User } = require('./server/db')

async function seed() {
  try {
    await db.sync({ force: true })
    await User.create({
      username: 'costcowholesale',
      password: '1234',
    })

    await User.create({
      username: 'test',
      password: '1234',
    })
  } catch (err) {
  } finally {
    db.close()
  }
}

seed()
