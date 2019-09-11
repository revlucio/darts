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

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState([])

  const removePlayer = name =>
    fetch(`/player/${name}`, {
      method: 'DELETE',
      headers: {
        ['Content-Type']: 'application/json; charset=utf-8',
      },
    }).then(() => {
      setPlayers(players.filter(p => p.name !== name))
    })

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
          <div className="ui input">
            <input type="text" placeholder="Player name..." onChange={e => setNewPlayerName(e.target.value)} />
          </div>
          <button className="ui primary button" onClick={() => addNewPlayer(newPlayerName)}>
            Add
          </button>
        </fieldset>

        <h2>Players</h2>
        <ul>
          {players.map(player => (
            <li>
              {player.name}{' '}
              <button className="ui negative button" onClick={() => removePlayer(player.name, setPlayers)}>
                Remove
              </button>
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
