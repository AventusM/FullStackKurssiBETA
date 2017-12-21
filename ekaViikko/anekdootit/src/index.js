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

const DisplayMostVotes = (props) => {
    return (
        <div>
            <h2>anecdote with most votes:</h2>
            <p>{props.anecdote}</p>
            <DisplayVotes votes={props.votes} />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAnecdote: 0,
            allShownSoFar: []
        }
    }

    setRandomAnecdote = (number) => {
        return () => {
            this.setState({ selectedAnecdote: number })
        }
    }

    asetaYksiLisaaNykyiseenIndeksiin = () => {
        return () => {
            this.setState({ allShownSoFar: this.state.allShownSoFar.concat(this.state.selectedAnecdote) })
        }
    }

    mostFrequent = () => {
        return () => {
            let counts = {}
            for (let i = 0; i < this.state.allShownSoFar.length; i++) {
                let num = this.state.allShownSoFar[i]
                counts[num] = counts[num] ? counts[num] + 1 : 1
            }
            console.log("If it hurts... " + counts[0])
            console.log("Adding manpower... " + counts[1])
            console.log("The first 90 percent..." + counts[2])
            console.log("Any fool can write..." + counts[3])
            console.log("Premature optimization..." + counts[4])
            console.log("Debugging is twice as hard if youre stupid..." + counts[5])
        }
    }

    //Laskun idea
    //Järjestetään olemassaoleva allShownSoFar - taulu
    //Loop per indeksi O(n^2...)
    //Otetaan talteen suurimman luvun omaava indeksi..?
    render() {
        console.log(this.props.anecdotes.length)
        const amountOfVotesForCurrentIndex = this.state.allShownSoFar.filter(luku => luku === this.state.selectedAnecdote).length
        // const mostFrequent = function () {
        //     let counts = []
        //     for (let i = 0; i < this.state.allShownSoFar.length; i++) {
        //         let num = this.state.allShownSoFar.length[i]
        //         counts[num] = counts[num] ? counts[num] + 1 : 1
        //     }
        //     console.log("If it hurts... " + counts[0])
        //     console.log("Adding manpower... " + counts[1])
        //     console.log("The first 90 percent..." + counts[2])
        //     console.log("Any fool can write..." + counts[3])
        //     console.log("Premature optimization..." + counts[4])
        //     console.log("Debugging is twice as hard if youre stupid..." + counts[5])
        // }
        console.log(this.mostFrequent.bind(this))

        return (
            <div>
                {this.props.anecdotes[this.state.selectedAnecdote]}
                <DisplayVotes votes={amountOfVotesForCurrentIndex} />
                <div>
                    <Button handleClick={this.asetaYksiLisaaNykyiseenIndeksiin()}
                        text="vote" />
                    <Button handleClick={this.setRandomAnecdote(Math.floor(Math.random() * this.props.anecdotes.length))}
                        text="next anecdote" />
                </div>
                {/* <DisplayMostVotes anecdote={this.props.anecdotes[maxVotesIndex]}
                    votes={maxVotes} /> */}
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