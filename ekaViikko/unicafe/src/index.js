import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: []
        }
    }
    pressHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1
        })
    }
    pressNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1
        })
    }
    pressHuono = () => {
        this.setState({
            huono: this.state.huono + 1
        })
    }
    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.pressHyva}>hyvä</button>
                <button onClick={this.pressNeutraali}>neutraali</button>
                <button onClick={this.pressHuono}>huono</button>
                <h2>statistiikka</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>hyvä: {this.state.hyva}</td>
                        </tr>
                        <tr>
                            <td>neutraali: {this.state.neutraali}</td>
                        </tr>
                        <tr>
                            <td>huono: {this.state.huono}</td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
