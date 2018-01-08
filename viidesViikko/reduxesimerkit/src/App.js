import React from 'react'
import actionFor from './actionCreators'

class NoteForm extends React.Component {
  addNote = (event) => {
    event.preventDefault()
    this.props.passedStoreFromApp.dispatch(actionFor.noteCreation(event.target.note.value))
    event.target.note.value = ''
  }
  render() {
    return (
      <form onSubmit={this.addNote}>
        <input name="note" />
        <button>lisää</button>
      </form>
    )
  }
}

const Note = (props) => {
  const { note, handleClick } = props
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

class NoteList extends React.Component {
  toggleImportance = (id) => (e) => {
    this.props.passedStoreFromApp.dispatch(
      actionFor.importanceToggling(id)
    )
  }
  render() {
    return (
      <ul>
        {this.props.passedStoreFromApp.getState().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={this.toggleImportance(note.id)}
          />
        )}
      </ul>
    )
  }
}

class App extends React.Component {

  render() {
    console.log(this.props.store.getState())
    return (
      <div>
        <NoteForm passedStoreFromApp={this.props.store} />
        <NoteList passedStoreFromApp={this.props.store} />
      </div>
    )
  }
}

export default App;
