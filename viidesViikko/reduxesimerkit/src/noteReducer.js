import React from 'react'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const newState = state.filter(n => n.id !== id)
      const noteToChange = state.find(n => n.id === id)
      const chagedNote = { ...noteToChange, important: !noteToChange.important }

      return newState.concat(chagedNote)
    default:
      return state
  }
}

export default noteReducer