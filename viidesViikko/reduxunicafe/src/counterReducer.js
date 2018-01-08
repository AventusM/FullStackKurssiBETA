import React from 'react'

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    //OBJECT Spread, KOSKA MUUTETAAN SITÄ HELVETIN OBJEKTIA
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'NEUTRAL':
      return { ...state, neutral: state.neutral + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'RESET':
      return { good: 0, neutral: 0, bad: 0 }
    case 'DO_NOTHING':
      return {...state}
  }
  return state
}

export default counterReducer