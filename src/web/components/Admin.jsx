import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { fetchPlayers } from '../services/api'

const addNewPlayer = name =>
  fetch('/player', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      ['Content-Type']: 'application/json; charset=utf-8',
    },
  })

const removePlayer = name =>
  fetch(`/player/${name}`, {
    method: 'DELETE',
    headers: {
      ['Content-Type']: 'application/json; charset=utf-8',
    },
  })

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers(setPlayers)
  }, [])

  if (isAdmin === null) {
    const cookies = new Cookies()

    fetch(`/secret?password=${cookies.get('token')}`).then(res => setIsAdmin(res.status === 200))
  } else if (isAdmin === true) {
    return (
      <>
        <h2>Admin</h2>
        <fieldset>
          <h3>Add a new player</h3>
          <label>
            Name: <input type="text" onChange={e => setNewPlayerName(e.target.value)} />
          </label>
          <button onClick={() => addNewPlayer(newPlayerName)}>add</button>
        </fieldset>

        <h2>Players</h2>
        <ul>
          {players.map(player => (
            <li>
              {player.name} <button onClick={() => removePlayer(player.name)}>remove</button>
            </li>
          ))}
        </ul>
      </>
    )
  } else if (isAdmin === false) {
    return <h2>Access denied</h2>
  }

  return <h2>Loading...</h2>
}

export default Admin
