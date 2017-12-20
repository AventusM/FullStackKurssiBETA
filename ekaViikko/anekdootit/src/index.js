import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const DisplayVotes = (props) => {
    return (
        <div>
            has {props.votes} votes
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            allShown: []
        }
    }

    getRandomAnecdote = (number) => {
        return () => {
            this.setState({ selected: number })
        }
    }

    asetaYksiLisaaNykyiseenIndeksiin = () => {
        return () => {
            this.setState({ allShown: this.state.allShown.concat(this.state.selected) })
        }
    }

    render() {
        console.log(this.state.selected)
        console.log(this.state.allShown)
        const amountOfVotesForCurrentIndex = this.state.allShown.filter(luku => luku === this.state.selected).length
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <DisplayVotes votes={amountOfVotesForCurrentIndex} />
                <div>
                    <Button handleClick={this.asetaYksiLisaaNykyiseenIndeksiin()}
                        text="vote" />
                    <Button handleClick={this.getRandomAnecdote(Math.floor(Math.random() * 6))}
                        text="next anecdote" />
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
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)