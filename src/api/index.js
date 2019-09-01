require('babel-polyfill')

import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const password = process.env.PASSWORD

app.use(express.static(__dirname + '/web'))

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

  const player = await Player.create({ name: req.query.name })

  await sequelize.close()

  return res.send('player created: ' + player.name)
})

app.get('/players', async (req, res) => {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://:postgres@localhost:5432/darts')

  const Player = sequelize.define('player', {
    name: Sequelize.STRING,
  })

  const players = await Player.findAll()

  await sequelize.close()

  return res.send(JSON.stringify(players))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
