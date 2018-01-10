import React from 'react'
import { upvoting } from './../reducers/anecdoteReducer'
import { changeMessage, deleteMessage } from './../reducers/messageReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    const { filter, anecdotes } = this.props
    //Combined reducer --> vaihtoehtoja nyt anecdotes ja message (uutena myös filter)
    // const filterValue = this.props.store.getState().filter
    // const anecdotes = this.props.store.getState().anecdotes
    const filterValue = filter
    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
    return (
      <div>
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              {/* https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs?answertab=votes#tab-top */}
              {/* https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout?answertab=votes#tab-top */}
              <button onClick={() => {
                this.props.upvoting(anecdote.id);
                this.props.changeMessage(`you voted for '${anecdote.content}'`);
                // this.props.store.dispatch(upvoting(anecdote.id));
                // this.props.store.dispatch(changeMessage(`you voted for '${anecdote.content}'`));
                setTimeout(() => {
                  this.props.deleteMessage()
                  // this.props.store.dispatch(deleteMessage())
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  upvoting,
  changeMessage,
  deleteMessage
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
// export default AnecdoteList