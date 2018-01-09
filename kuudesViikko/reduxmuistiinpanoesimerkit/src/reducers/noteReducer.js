const initialState = [
  { content: 'klikkaamalla muistiinpanoa voit määritellä sen tärkeyden', important: false, id: 1 },
  { content: 'tässä toinen..', important: false, id: 2 }
]

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data] // sama kuin state.concat(action.data) HUOM EI push
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const newState = state.filter(n => n.id !== id)
      const noteToChange = state.find(n => n.id === id)
      const chagedNote = { ...noteToChange, important: !noteToChange.important }

      return [...newState, chagedNote]
    default:
      return state
  }
}

//Allaolevat dispatchataan
const generateId = () => Number((Math.random() * 1000000).toFixed(0))
export const noteCreation = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const importanceToggling = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {
      id //id : id
    }
  }
}

export default noteReducer