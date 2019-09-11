require('babel-polyfill')

export const database = async () => {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://:postgres@localhost:5432/darts')

  const Player = sequelize.define('player', {
    name: Sequelize.STRING,
  })

  const Game = sequelize.define('game', {
    winner: Sequelize.STRING,
    loser: Sequelize.STRING,
  })

  await sequelize.sync()

  return { sequelize, Player, Game }
}
