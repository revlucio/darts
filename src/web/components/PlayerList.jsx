import React, { useEffect, useState } from 'react'
import { fetchPlayers } from '../services/api'

const PlayerList = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers(setPlayers)
  }, [])

  return (
    <>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li>{player.name}</li>
        ))}
      </ul>
    </>
  )
}

export default PlayerList
