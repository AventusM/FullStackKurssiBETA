import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {

  render() {
    const combinedReducerContents = this.props.store.getState()
    console.log(combinedReducerContents)
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        <Notification store={this.props.store} />
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App