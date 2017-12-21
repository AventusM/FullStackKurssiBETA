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
    const summaaja = (summaNYT, indeksinArvo) => summaNYT + indeksinArvo
    //Luodaan taulukko osien tehtävistä erikseen, aloitetaan tyhjästä
    const tehtLKMTaulu = []
    osat.forEach(osa => {
        tehtLKMTaulu.push(osa.tehtavia)
    })
    const tehtyjenLKM = tehtLKMTaulu.reduce(summaaja)
    // console.log(tehtLKMTaulu) -> TOIMII
    console.log(tehtyjenLKM) //-> LASKEE yllä saadun taulun summan
    return (
        <div>
            <ul>
                {/* //Yksi osa -> li (mapataan...) */}
                {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavienlkm={osa.tehtavia} />)}
            </ul>
            yhteensä {tehtyjenLKM} tehtävää
        </div>
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
