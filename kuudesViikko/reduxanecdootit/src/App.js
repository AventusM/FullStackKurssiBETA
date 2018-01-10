import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import blogService from './services/blogs'

class App extends React.Component {
  componentWillMount = async () => {
    const foundBlogs = await blogService.getAllBlogs()
    console.log('Löydetyt blogit', foundBlogs)
    this.props.anecdoteInitialization(foundBlogs)
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