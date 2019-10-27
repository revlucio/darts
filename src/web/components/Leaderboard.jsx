import React, { useEffect, useState } from 'react'
import { fetchPlayers } from '../services/api'

const playerRow = ({ losses, name, wins, winPercentage }) => (
  <tr>
    <td>{name}</td>
    <td>{wins}</td>
    <td>{losses}</td>
    <td>{winPercentage}%</td>
  </tr>
)

const Leaderboard = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers(setPlayers)
  }, [])

  return (
    <>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>W</th>
            <th>L</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>{players.map(playerRow)}</tbody>
      </table>
    </>
  )
}

export default Leaderboard
