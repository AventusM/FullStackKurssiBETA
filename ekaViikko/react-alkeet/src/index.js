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
            <Osa osaNimi={props.osat[0].nimi} osanTehtLKM={props.osat[0].tehtavia} />
            <Osa osaNimi={props.osat[1].nimi} osanTehtLKM={props.osat[1].tehtavia} />
            <Osa osaNimi={props.osat[2].nimi} osanTehtLKM={props.osat[2].tehtavia} />
        </div>
    )
}

const Yhteensa = (props) => {
    const eka = props.osat[0].tehtavia
    const toka = props.osat[1].tehtavia
    const kolmas = props.osat[2].tehtavia
    const summa = eka + toka + kolmas
    return (
        <div>
            <p>yhteensä {summa} tehtävää</p>
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
    const kurssi =  {
        nimi: "Half Stack -sovelluskehitys",
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)