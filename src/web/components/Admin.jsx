import React, { useState } from 'react'
import Cookies from 'universal-cookie'

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null)

  if (isAdmin === null) {
    const cookies = new Cookies()

    fetch(`/secret?password=${cookies.get('token')}`).then(res => setIsAdmin(res.status === 200))
  } else if (isAdmin === true) {
    return <h2>Admin</h2>
  } else if (isAdmin === false) {
    return <h2>Access denied</h2>
  }

  return <h2>Loading...</h2>
}

export default Admin
