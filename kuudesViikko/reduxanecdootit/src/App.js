import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {
  componentWillMount = () => {
    this.props.anecdoteInitialization()
    // const foundAnecdotes = await anecdoteService.getAllAnecdotes()
    // console.log('Löydetyt anekdootit', foundAnecdotes)
    // this.props.anecdoteInitialization(foundAnecdotes)
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <h2>Anecdotes</h2>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const dispatchMapToProps = {
  anecdoteInitialization
}

export default connect(null, dispatchMapToProps)(App)