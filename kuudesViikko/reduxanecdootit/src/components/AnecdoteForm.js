import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { changeMessage, deleteMessage } from './../reducers/messageReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.changeMessage(`anecdote '${content}' created`)
    setTimeout(() => {
      this.props.deleteMessage()
    }, 5000)
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
  changeMessage,
  deleteMessage
}

//mapStateToPropsia ei tarvita ---> null tilalle
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm