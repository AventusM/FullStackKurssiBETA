import React from 'react';
import ReactDOM from 'react-dom';
const Esitys = (props) => {
    return (
        <div>
            <h2>{props.esitys}</h2>
        </div >
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>)
}

//Statisticsin sisällä yksittäinen statistic
//samoin kuin Sisältö -> Osa
const Statistics = (props) => {
    const taulunSumma = props.tulosTaulu.reduce(function (a, b) { return a + b; })
    const keskiArvo = taulunSumma / (props.tulosTaulu.length - 1)
    const positiivistenOsuus = (props.tulosTaulu.filter(luku => luku > 0).length / (props.tulosTaulu.length - 1)) * 100
    console.log(props.tulosTaulu)
    console.log(taulunSumma)
    return (
        <table>
            <tbody>
                <tr><Statistic etuliite="hyvä: " tulos={props.hyvienLKM} /></tr>
                <tr><Statistic etuliite="neutraali: " tulos={props.neutraaliLKM} /></tr>
                <tr><Statistic etuliite="huono: " tulos={props.huonoLKM} /></tr>
                <tr><Statistic etuliite="keskiarvo: " tulos={keskiArvo} /></tr>
                <tr><Statistic etuliite="positiivisia: " tulos={positiivistenOsuus} loppuliite="%" /></tr>
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <td>
            {props.etuliite} {props.tulos} {props.loppuliite}
        </td>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            // Laitetaan nolla, muuten reduce valittaa errorista
            // Keskiarvon laskusta vähennetään yksi jäsen myöhemmin
            kaikki: [0]
        }
    }

    //Mielestäni paras vaihtoehto jokaiselle napille oma laskuri
    //metodeineen iffihässäkän tms. sijaan
    //Myöhemmässä tehtävässä tämäkin korjataan :)
    pressHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            kaikki: this.state.kaikki.concat(1)
        })
    }
    pressNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            kaikki: this.state.kaikki.concat(0)
        })
    }
    pressHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            kaikki: this.state.kaikki.concat(-1)
        })
    }

    render() {
        return (
            <div>
                <Esitys esitys="anna palautetta" />
                <div>
                    <Button
                        handleClick={this.pressHyva}
                        text="hyvä" />
                    <Button
                        handleClick={this.pressNeutraali}
                        text="neutraali" />
                    <Button
                        handleClick={this.pressHuono}
                        text="huono" />
                </div>
                <Esitys esitys="statistiikka" />
                <div>
                    <Statistics
                        hyvienLKM={this.state.hyva}
                        neutraaliLKM={this.state.neutraali}
                        huonoLKM={this.state.huono}
                        tulosTaulu={this.state.kaikki} />
                </div>
            </div >
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
