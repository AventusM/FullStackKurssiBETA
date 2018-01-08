import React from 'react'
import { actionFor } from './reducer'

class AnecdoteForm extends React.Component {
  addAnecdote = (event) => {
    event.preventDefault()
    //input name anecdote --> event.target.anecdote.value
    const content = event.target.anecdote.value
    this.props.store.dispatch(actionFor.anecdoteCreation(content))
    //Reset kentän arvo anekdootin lisäyksen jälkeen
    event.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const Anecdote = (props) => {
  const { anecdote, handleClick } = props
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} <button onClick={handleClick}>vote</button></div>
    </div>
  )
}

class AnecdoteList extends React.Component {
  addVote = (id) => (event) => {
    event.preventDefault()
    this.props.store.dispatch(actionFor.upvoting(id))
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.addVote(anecdote.id)}
          />
        )}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Luokat voivat jatkaa vähän hassusti this.props.storella omassa luokassaan
        refaktoroinnin kannalta vähän yksi hailee... Tämä tapa sallii nimien pysyvän samana */}
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App