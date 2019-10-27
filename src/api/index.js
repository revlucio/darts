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
  const { sequelize, Player } = await database()
  await Player.create({ name: req.body.name })

  await sequelize.close()

  return res.send(200)
})

app.delete('/player/:name', async (req, res) => {
  const { sequelize, Player } = await database()
  await Player.destroy({ where: { name: req.params.name } })

  await sequelize.close()

  return res.send(201)
})

app.get('/players', async (req, res) => {
  const { sequelize, Player, Game } = await database()
  const players = await Player.findAll()
  const games = await Game.findAll()
  await sequelize.close()

  const leaderboard = players
    .map(player => {
      const { name } = player
      const wins = games.filter(game => game.winner === name).length
      const losses = games.filter(game => game.loser === name).length
      const winPercentage = Math.round((wins / (wins + losses)) * 100 || 0)

      return { name, wins, losses, winPercentage }
    })
    .sort((left, right) => {
      const winDifference = right.wins - left.wins
      return winDifference === 0 ? right.winPercentage - left.winPercentage : winDifference
    })

  return res.json(leaderboard)
})

app.post('/game', async (req, res) => {
  const { sequelize, Game } = await database()
  await Game.create({ winner: req.body.winner, loser: req.body.loser })

  await sequelize.close()

  return res.send(201)
})

app.use((req, res, next) => {
  if (req.url.startsWith('/login') || req.url.startsWith('/admin')) {
    req.url = '/'
  }
  next()
})

app.use(express.static(__dirname + '/web'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
