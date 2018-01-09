import React from 'react'
import { importanceToggling } from './../reducers/noteReducer'
import PropTypes from 'prop-types'

class NoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  toggleImportance = (id) => (e) => {
    e.preventDefault()
    this.context.store.dispatch(importanceToggling(id))
  }
  render() {
    const notesToShow = () => {
      const notes = this.context.store.getState().notes
      const filter = this.context.store.getState().filter
      if (filter === 'ALL') {
        return notes
      }

      return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    }
    return (
      <ul>
        {/* Yhdistetty reducer --> viitataan store.getState().haluttuTyyppi */}
        {notesToShow().map(note =>
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

NoteList.contextTypes = {
  store: PropTypes.object
}

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

export default NoteList