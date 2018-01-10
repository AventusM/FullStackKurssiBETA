const getId = () => (100000 * Math.random()).toFixed(0) // TULEE KATOAMAAN

const anecdoteReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE':
      return [...state, { content: action.content, id: getId(), votes: 0 }]
    case 'VOTE':
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    default:
      return state
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
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
    data //res.data
  }
}

export default anecdoteReducer