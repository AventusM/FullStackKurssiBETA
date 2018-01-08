import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './counterReducer'


class App extends React.Component {
  render() {
    const overall = store.getState().good + store.getState().neutral + store.getState().bad
    const good = store.getState().good
    const goodAmount = (good / overall) * 100 || 0

    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={event => store.dispatch({ type: 'GOOD' })}>
          hyvä
        </button>
        <button onClick={event => store.dispatch({ type: 'NEUTRAL' })}>
          neutraali
        </button>
        <button onClick={event => store.dispatch({ type: 'BAD' })}>
          huono
        </button>
        <br />
        <div>
          <h2>Statistiikka</h2>
          {/* Voi viedä omaan moduuliin */}
          <table>
            <tbody>
              <tr>
                <td>hyvä</td>
                <td>{store.getState().good}</td>
              </tr>
              <tr>
                <td>neutraali</td>
                <td>{store.getState().neutral}</td>
              </tr>
              <tr>
                <td>huono</td>
                <td>{store.getState().bad}</td>
              </tr>
              <tr>
                <td>hyviä</td>
                <td>{goodAmount}%</td>
              </tr>
              <tr>
                <td><button onClick={event => store.dispatch({ type: 'RESET' })}>nollaa tilastot</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const store = createStore(counterReducer)
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)

export default App