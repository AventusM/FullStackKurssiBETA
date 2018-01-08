import React from 'react';


const actionFor = {
  upvoting(id) {
    return {
      type: 'UPVOTE',
      id
    }
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
        <h2>Anecdotes</h2>
        <AnecdoteList store={this.props.store} />

        <h2>create new</h2>

        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App