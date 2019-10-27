import React, { useEffect, useState } from 'react'
import { fetchPlayers } from '../services/api'

const playerRow = ({ losses, name, wins, winPercentage }) => (
  <tr>
    <td>{name}</td>
    <td>{wins}</td>
    <td>{losses}</td>
    <td>{winPercentage}</td>
  </tr>
)

const Leaderboard = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers(setPlayers)
  }, [])

  return (
    <div className="ui raised very padded text container segment">
      <h1 className="ui header">Fluidly Darts Leaderboard</h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>{players.map(playerRow)}</tbody>
      </table>
    </div>
  )
}

export default Leaderboard
