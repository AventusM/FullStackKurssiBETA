import counterReducer from './counterReducer'
import deepFreeze from 'deep-freeze'

describe('unicafe reducer', () => {

  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = []
    const action = {
      type: 'DO_NOTHING'
    }
    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  //NEUTRAL ja BAD täysin samoja, laitetaan kuitenkin RESET mukaan
  it('should return a new state with action GOOD', () => {
    const state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState.good).toEqual(initialState.good + 1)

  })

  it('should return a new reset state with action RESET', () => {
    const state = {
      good: 10,
      neutral: 20,
      bad: 30
    }
    const action = {
      type: 'RESET'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)

  })
})