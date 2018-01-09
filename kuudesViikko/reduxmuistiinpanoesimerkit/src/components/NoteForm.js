import React from 'react'
import { noteCreation } from './../reducers/noteReducer'
import PropTypes from 'prop-types'

class NoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addNote = (e) => {
    e.preventDefault()
    //noteCreation importataan
    this.context.store.dispatch(noteCreation(e.target.note.value))
    e.target.note.value = ''
  }

  render() {
    return (
      <form onSubmit={this.addNote}>
        <input name='note' />
        <button>lisää</button>
      </form>
    )

  }
}

NoteForm.contextTypes = {
  store: PropTypes.object
}

export default NoteForm