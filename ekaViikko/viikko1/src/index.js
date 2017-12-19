import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
        <div>
            <p>Your name is {props.name}, {props.age} years of age</p>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            greeting app created by <a href="https://github.com/AventusM">Anton Moroz</a>
        </div>
    )
}

const App = () => {
    const nimi = 'Geir'
    const ika = 23
    return (
        <div>
            <Hello name="Anton" age={24} />
            <Hello name={nimi} age={ika} />
            <Footer />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))