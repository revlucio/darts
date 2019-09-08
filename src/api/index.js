import { database } from './database'
import express from 'express'

require('babel-polyfill')

const app = express()
const port = process.env.PORT || 3000
const password = process.env.PASSWORD

app.use(express.json())

app.get('/secret', (req, res) => {
  if (req.query.password !== password) {
    return res.send(401)
  }

  return res.send(200)
})

app.post('/player', async (req, res) => {
  const { sequelize, Player } = database()
  await Player.create({ name: req.body.name })

  await sequelize.close()

  return res.send(200)
})

app.delete('/player/:name', async (req, res) => {
  const { sequelize, Player } = database()
  await Player.destroy({ where: { name: req.params.name } })

  await sequelize.close()

  return res.send(200)
})

app.get('/players', async (req, res) => {
  const { sequelize, Player } = database()
  const players = await Player.findAll()

  await sequelize.close()

  return res.send(JSON.stringify(players))
})

app.use((req, res, next) => {
  if (req.url.startsWith('/login') || req.url.startsWith('/admin')) {
    req.url = '/'
  }
  next()
})

app.use(express.static(__dirname + '/web'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
