const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const password = process.env.PASSWORD

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/secret', (req, res) => {
  if (password && req.query.password !== password) {
    return res.send('Access denied')
  }
  return res.send('you found the secret!')
})

app.get('/player', async (req, res) => {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://:postgres@localhost:5432/darts')

  const Player = sequelize.define('player', {
    name: Sequelize.STRING,
  })

  await sequelize.sync()
  const player = await Player.create({ name: 'Joe' })

  return res.send('player created: ' + player.name)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
