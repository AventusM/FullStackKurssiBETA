import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { changeMessage } from './../reducers/messageReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.changeMessage(`anecdote '${content}' created`)
    // this.props.store.dispatch(anecdoteCreation(content))
    // this.props.store.dispatch(changeMessage(`anecdote '${content}' created`))
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

//Propsit täältä
const mapDispatchToProps = {
  anecdoteCreation,
  changeMessage
}

//mapStateToPropsia ei tarvita ---> null tilalle
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
// export default AnecdoteForm