import React from 'react'
import { upvoting } from './../reducers/anecdoteReducer'
import { changeMessage, deleteMessage } from './../reducers/messageReducer'

class AnecdoteList extends React.Component {
  render() {
    //Combined reducer --> vaihtoehtoja nyt anecdotes ja message
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              {/* https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs?answertab=votes#tab-top */}
              {/* https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout?answertab=votes#tab-top */}
              <button onClick={() => {
                this.props.store.dispatch(upvoting(anecdote.id));
                this.props.store.dispatch(changeMessage(`you voted for '${anecdote.content}'`));
                setTimeout(() => {
                  this.props.store.dispatch({ type: 'DELETE_MESSAGE' })
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

export default AnecdoteList