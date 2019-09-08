export const fetchPlayers = setPlayers => {
  fetch('/players')
    .then(response => response.json())
    .then(json => {
      setPlayers(json)
    })
}
