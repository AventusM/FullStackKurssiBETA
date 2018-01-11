import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { changeMessage, deleteMessage } from './../reducers/messageReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = '' // SIIRRETTÄVÄ TÄNNE ALHAALTA NULLIN VÄLTTÄMISEKSI
    const anecdoteFromPost = await anecdoteService.createNewAnecdote(content) // return res.data
    console.log('res.data POSTista ', anecdoteFromPost)
    this.props.anecdoteCreation(anecdoteFromPost) // res.data
    this.props.changeMessage(`anecdote '${content}' created`)
    setTimeout(() => {
      this.props.deleteMessage()
    }, 5000)
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