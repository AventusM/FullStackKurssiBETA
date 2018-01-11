const anecdoteReducer = (state = [], action) => {
  // console.log('ACTION:', action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE':
      // console.log('anecdoteReducerin sisällä --> ', action.data)
      return [...state, action.data] // Palvelimelta haku --> action.data järkevämpi
    case 'VOTE':
      // console.log('param action', action)
      // console.log('param action id', action.data.id)
      // console.log(state.map(alkio => alkio.id))
      const filteredState = state.filter(alkio => alkio.id !== action.data.id)
      return [...filteredState, action.data]
    default:
      return state
  }
}

export const anecdoteCreation = (data) => {
  // console.log('anecdoteCreationin sisällä --> res.data', data)
  return {
    type: 'CREATE',
    data //res.data (POST, votes : 0 siellä sisällä)
  }
}

// export const upvoting = (id) => {
//   return {
//     type: 'VOTE',
//     id
//   }
// }

//HTTP PUT res.data (koko objekti päivitetään vaikka siinä muuttuu vain 1 kenttä)
export const upvoting = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INITIALIZE',
    data //res.data GET
  }
}

export default anecdoteReducer