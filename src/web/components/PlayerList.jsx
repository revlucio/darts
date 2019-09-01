import React, { useState, useEffect } from 'react'

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    fetch('/players')
      .then(response => response.json())
      .then(json => {
        setLoaded(true)
        setPlayers(json)
      })
  }

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
