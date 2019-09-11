export const fetchPlayers = setPlayers => {
  fetch('/players')
    .then(response => response.json())
    .then(json => {
      setPlayers(json)
    })
}

const request = (method, url, json = {}) =>
  fetch(url, {
    method: method,
    body: JSON.stringify(json),
    headers: {
      ['Content-Type']: 'application/json; charset=utf-8',
    },
  })

export const post = (url, json) => request('POST', url, json)
export const del = url => request('DELETE', url)
