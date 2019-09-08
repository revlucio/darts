export const database = () => {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://:postgres@localhost:5432/darts')

  const Player = sequelize.define('player', {
    name: Sequelize.STRING,
  })
  return { sequelize, Player }
}
