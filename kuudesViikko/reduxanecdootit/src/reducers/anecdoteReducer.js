const anecdoteReducer = (state = [], action) => {
  // console.log('ACTION:', action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE':
      console.log('anecdoteReducerin sisällä --> ', action.data)
      return [...state, action.data] // Palvelimelta haku --> action.data järkevämpi
    case 'VOTE':
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    default:
      return state
  }
}

export const anecdoteCreation = (data) => {
  console.log('anecdoteCreationin sisällä --> res.data', data)
  return {
    type: 'CREATE',
    data //res.data (POST, votes : 0 siellä sisällä)
  }
}

export const upvoting = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INITIALIZE',
    data //res.data GET
  }
}

export default anecdoteReducer