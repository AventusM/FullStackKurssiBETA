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
    const taulunPituus = props.tulosTaulu.length
    const prosenttiKerroin = 100
    const taulunSumma = props.tulosTaulu.reduce(function (a, b) { return a + b; })
    const keskiArvo = taulunSumma / taulunPituus
    const positiivistenOsuus = (props.tulosTaulu.filter(luku => luku > 0).length / taulunPituus) * prosenttiKerroin
    console.log(props.tulosTaulu)
    console.log(taulunSumma)
    return (
        <table>
            <tbody>
                <Statistic etuliite="hyvä " tulos={props.hyvienLKM} />
                <Statistic etuliite="neutraali " tulos={props.neutraaliLKM} />
                <Statistic etuliite="huono " tulos={props.huonoLKM} />
                <Statistic etuliite="keskiarvo " tulos={keskiArvo} />
                <Statistic etuliite="positiivisia " tulos={positiivistenOsuus} loppuliite="%" />
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.etuliite}</td>
            <td>{props.tulos}</td>
            <td>{props.loppuliite}</td>
        </tr>
    )
}
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
            hyva: this.state.hyva + 1,
        })
    }
    pressNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }
    pressHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
    }

    asetaArvoon = (arvo, funktio) => {
        return () => {
            this.setState({
                kaikki: this.state.kaikki.concat(arvo)
            })
            //Funktio suoritetaan setStaten ulkopuolella (omat setStatet käytössä)
            funktio();
        }
    }

    render() {
        //Tämä asetus sallii taulukon lähtemisen liikkeelle
        //täysin tyhjästä (ei päästä reducen tilanteeseen)
        const noInputGiven = this.state.kaikki.length === 0
        return (
            <div>
                <Esitys esitys="anna palautetta" />
                <div>
                    <Button
                        handleClick={this.asetaArvoon(1, this.pressHyva)}
                        text="hyvä" />
                    <Button
                        handleClick={this.asetaArvoon(0, this.pressNeutraali)}
                        text="neutraali" />
                    <Button
                        handleClick={this.asetaArvoon(-1, this.pressHuono)}
                        text="huono" />
                </div>
                <Esitys esitys="statistiikka" />
                <div>
                    {/* Mallia otettu täältä https://reactjs.org/docs/conditional-rendering.html */}
                    {noInputGiven ? (
                        <p>yhtään palautetta ei ole annettu</p>
                    ) : (
                            <Statistics
                                hyvienLKM={this.state.hyva}
                                neutraaliLKM={this.state.neutraali}
                                huonoLKM={this.state.huono}
                                tulosTaulu={this.state.kaikki} />)}
                </div>
            </div >
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
