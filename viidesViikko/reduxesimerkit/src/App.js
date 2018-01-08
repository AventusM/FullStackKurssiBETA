import React, { Component } from 'react';
import noteReducer from './noteReducer'
import { createStore } from 'redux'

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'sovelluksen tila talletetaan storeen',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'tilanmuutokset tehdään actioneilla',
    important: false,
    id: 2
  }
})

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {store.getState().map(note =>
            <li key={note.id}>
              {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default App;
