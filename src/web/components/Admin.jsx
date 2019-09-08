import React, { useState } from 'react'
import Cookies from 'universal-cookie'

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
      </>
    )
  } else if (isAdmin === false) {
    return <h2>Access denied</h2>
  }

  return <h2>Loading...</h2>
}

export default Admin
