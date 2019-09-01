import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PlayerList from './PlayerList'
import Login from './Login'
import Admin from './Admin'

export const Routes = () => (
  <Router>
    <Route path="/" exact component={PlayerList} />
    <Route path="/login" component={Login} />
    <Route path="/admin" component={Admin} />
  </Router>
)
