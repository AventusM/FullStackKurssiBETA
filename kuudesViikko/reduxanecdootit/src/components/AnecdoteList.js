import React from 'react'
import { upvoting, anecdoteCreation } from './../reducers/anecdoteReducer'
import { changeMessage, deleteMessage } from './../reducers/messageReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        {this.props.visibleAnecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                {/* https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs?answertab=votes#tab-top */}
                {/* https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout?answertab=votes#tab-top */}
                <button onClick={async () => {
                  const upvotedAnecdote = await anecdoteService.updateExistingAnecdote(anecdote.id, anecdote)
                  this.props.upvoting(upvotedAnecdote)
                  this.props.changeMessage(`you voted for '${anecdote.content}'`);
                  setTimeout(() => {
                    this.props.deleteMessage()
                  }, 5000) // Kaikki tämä tapahtuu PER yksi onclick eli sen spämmääminen aiheuttaa mielenkiintoisen tilanteen (reset aina 5 sekunnin välein --> viimeisin tapahtuma ei välttämättä näy pitkään)
                }}>
                  vote
              </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  const filterValue = filter
  console.log('anekdootit', anecdotes)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  upvoting,
  changeMessage,
  deleteMessage
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList