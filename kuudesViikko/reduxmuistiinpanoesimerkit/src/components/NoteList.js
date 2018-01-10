import React from 'react'
import { importanceToggling } from './../reducers/noteReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class NoteList extends React.Component {
  //Propsit --> mount/unmount tarpeettomia

  // componentDidMount() {
  //   const { store } = this.context;
  //   this.unsubscribe = store.subscribe(() =>
  //     this.forceUpdate()
  //   )
  // }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }

  toggleImportance = (id) => (e) => {
    e.preventDefault()
    //mapDispatchToProps --> erillinen 'dispatch' ei enää tarpeellinen connectin kanssa
    //HUOM VIITATAAN PROPSIEN KAUTTA
    //EI suoraan 'importanceToggling(id)
    this.props.importanceToggling(id)
    // this.context.store.dispatch(importanceToggling(id))
  }
  render() {
    const notesToShow = () => {
      // const notes = this.props.notes
      // const filter = this.props.filter
      // const notes = this.context.store.getState().notes
      // const filter = this.context.store.getState().filter

      //mapStateToProps --> propsit saadaan suoraan täältä connectin kautta
      const { notes, filter } = this.props
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

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  importanceToggling
}
//Connectin ekoihin sulkuihin parametrit sisään
const ConnectedNoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList)
// export default NoteList
export default ConnectedNoteList