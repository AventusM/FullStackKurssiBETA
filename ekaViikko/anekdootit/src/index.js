import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const DisplayVotes = ({ votes }) => {
    return (
        <div>
            has {votes} votes
        </div>
    )
}

const DisplayMostVotes = ({ anecdote, votes }) => {
    return (
        <div>
            <h2>anecdote with most votes:</h2>
            <div>{anecdote}</div>
            <div>has {votes} votes</div>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAnecdote: 0,
            votes: Array(this.props.anecdotes.length).fill(0)
        }
    }

    setRandomAnecdote = (number) => {
        return () => {
            this.setState({ selectedAnecdote: number })
        }
    }

    addOne = () => {
        const updatedVotes = this.state.votes.slice()
        updatedVotes[this.state.selectedAnecdote] += 1
        console.log(updatedVotes)
        this.setState({
            votes: updatedVotes
        })
    }

    maxVoteAnecdoteIndex = () => {
        const maxVotes = Math.max(...this.state.votes)
        console.log('max votes', maxVotes)
        const indexOfMax = this.state.votes.indexOf(maxVotes)
        console.log('index of max votes', indexOfMax)
        console.log('anecdote', this.props.anecdotes[indexOfMax])
        return indexOfMax //undefined ilman return value
    }

    render() {
        console.log(this.maxVoteAnecdoteIndex())
        const votesForCurrent = this.state.votes[this.state.selectedAnecdote]
        return (
            <div>
                {this.props.anecdotes[this.state.selectedAnecdote]}
                <DisplayVotes votes={votesForCurrent} />
                <div>
                    <Button handleClick={this.addOne}
                        text="vote" />
                    <Button handleClick={this.setRandomAnecdote(Math.floor(Math.random() * this.props.anecdotes.length))}
                        text="next anecdote" />
                </div>
                <div>
                    <DisplayMostVotes anecdote={this.props.anecdotes[this.maxVoteAnecdoteIndex()]} votes={this.state.votes[this.maxVoteAnecdoteIndex()]} />
                </div>
            </div >
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)