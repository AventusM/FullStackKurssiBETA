import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('ACTION:', action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE':
      return [...state, action.data] // Palvelimelta haku --> action.data järkevämpi
    case 'VOTE':
      const filteredState = state.filter(alkio => alkio.id !== action.data.id)
      return [...filteredState, action.data]
    default:
      return state
  }
}

// export const anecdoteCreation = (data) => {
//   // console.log('anecdoteCreationin sisällä --> res.data', data)
//   return {
//     type: 'CREATE',
//     data //res.data (POST, votes : 0 siellä sisällä)
//   }
// }

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content) //AnecdoteForm.js:stä tulee content (event.target.anecdote.value)
    dispatch({ // Tässä versiossa erillinen dispatch (mapDispatchToProps ei näköjään riittävä..?) Tykkään ylläolevasta kommentoidusta versiosta enemmän
      //Etuna kuitenkin se, että dispatch tapahtuu asynkronisesti AINA newAnecdoten awaitin jälkeen
      type: 'CREATE',
      data: newAnecdote //res.data edelleen, nyt vaan eri muodossa
    })
  }
}

// export const upvoting = (id) => {
//   return {
//     type: 'VOTE',
//     id
//   }
// }

//HTTP PUT res.data (koko objekti päivitetään vaikka siinä muuttuu vain 1 kenttä)
// export const upvoting = (data) => {
//   return {
//     type: 'VOTE',
//     data
//   }
// }

//3. versiossa 1. parametrinä id ja itse anekdootti, logiikka siirretty AnecdodeLististä tänne (await ...)
export const upvoting = (id, anecdote) => {
  return async (dispatch) => {
    const upvotedAnecdote = await anecdoteService.updateExistingAnecdote(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: upvotedAnecdote
    })
  }
}

// export const anecdoteInitialization = (data) => {
//   return {
//     type: 'INITIALIZE',
//     data //res.data GET
//   }
// }

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer