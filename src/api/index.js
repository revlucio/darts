const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const password = process.env.PASSWORD

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/secret', (req, res) => {
  if (password && req.query.password !== password) {
    return res.send('Access denied');
  }
  return res.send('you found the secret!');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))