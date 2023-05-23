const app = require('./index')
const { db } = require('./db')

db.sync().then(() => {
  app.listen(1337, () => console.log('Server listening on 1337'))
})
