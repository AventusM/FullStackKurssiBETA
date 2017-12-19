import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osaNimi={props.ekaOsa} osanTehtLKM={props.ekaOsaLKM} />
            <Osa osaNimi={props.tokaOsa} osanTehtLKM={props.tokaOsaLKM} />
            <Osa osaNimi={props.kolmasOsa} osanTehtLKM={props.kolmasOsaLKM} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.lkm} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osaNimi} {props.osanTehtLKM}</p>
        </div>
    )
}

const App = () => {
    const kurssi = "Half Stack -sovelluskehitys"
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto ekaOsa={osa1} ekaOsaLKM={tehtavia1}
                tokaOsa={osa2} tokaOsaLKM={tehtavia2}
                kolmasOsa={osa3} kolmasOsaLKM={tehtavia3} />
            <Yhteensa lkm={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)