import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
//createStore ennen appia - muuten tulee undefined
import App from './App'
import noteReducer from './noteReducer'

const store = createStore(noteReducer)

const render = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}

render()
store.subscribe(render)
store.subscribe(() => console.log(store.getState()))
