import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

const Osa = (props) => {
    return (
        <li>
            {props.nimi}, tehtäviä {props.tehtavienlkm}
        </li>
    )
}

const Sisalto = (props) => {
    //Destrukturointi, otetaan parametri suoraan Kurssi - literaalista sellaisenaan aaa.bbb.ccc ... jatkumon välttämiseksi
    const { osat } = props
    //Yksi osa -> li (mapataan...)
    return (
        <ul>
            {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavienlkm={osa.tehtavia} />)}
        </ul>
    )
}

const Kurssi = (props) => {
    //App -> Kurssi kurssi =  {kurssi} -> otetaan suoraan käyttöön täällä
    const { kurssi } = props
    return (
        <div>
            <h2>{kurssi.nimi}</h2>
            <h3>sisältö</h3>
            <Sisalto osat={kurssi.osat} />
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1,
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2,
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3,
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
