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
//1. param mapStateToProps
//2. param mapDispatchToProps
//Sulut erikseen (mihin komponenttiin otetaan yhteys, joka voi viitata edellisiin propseilla)
//Nyt ei tarvitse mennä App.js:n kautta (this.props.store.getState(). . .)
//index.js:ssä Providerin TULEE SISÄLTÄÄ App
export default connect(null, mapDispatchToProps)(AnecdoteForm)
//Nyt App.js:n import näyttää järkevämmältä...