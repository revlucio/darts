import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { fetchPlayers, post, del } from '../services/api'

const addNewPlayer = name => post('/player', { name })
const addNewGame = game => post('/game', game)

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState([])
  const [newGame, setNewGame] = useState({})

  const removePlayer = name =>
    del(`/player/${name}`).then(() => {
      setPlayers(players.filter(p => p.name !== name))
    })

  const setWinner = winner => setNewGame({ ...newGame, winner })
  const setLoser = loser => setNewGame({ ...newGame, loser })

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
        <div className="ui list">
          {players.map(player => (
            <div className="item">
              {player.name}{' '}
              <button className="ui negative button" onClick={() => removePlayer(player.name, setPlayers)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <h2>Games</h2>
        <fieldset>
          <h3>Add a new game</h3>
          <select onChange={e => setWinner(e.target.value)}>
            <option>Select a player</option>
            {players.map(player => (
              <option>{player.name}</option>
            ))}
          </select>
          beat
          <select onChange={e => setLoser(e.target.value)}>
            <option>Select a player</option>
            {players.map(player => (
              <option>{player.name}</option>
            ))}
          </select>
          <button className="ui primary button" onClick={() => addNewGame(newGame)}>
            Add
          </button>
        </fieldset>
      </>
    )
  } else if (isAdmin === false) {
    return <h2>Access denied</h2>
  }

  return <h2>Loading...</h2>
}

export default Admin
