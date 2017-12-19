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
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto ekaOsa={osa1.nimi} ekaOsaLKM={osa1.tehtavia}
                tokaOsa={osa2.nimi} tokaOsaLKM={osa2.tehtavia}
                kolmasOsa={osa3.nimi} kolmasOsaLKM={osa3.tehtavia} />
            <Yhteensa lkm={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)