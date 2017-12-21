import React from 'react'
import ReactDOM from 'react-dom'
//Käytetään suoraan kuin olisi tämän tiedoston sisällä !!
import App from './App'

const notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: true
    }
]

//importataan tämä
// const Note = (props) => {
//     //Jätetään funktion omat parametrit rauhaan
//     //Ja tehdään tarvittava muutos NoteteraaNoten sisällä
//     //Tiedetään, että tänne päästään tunnuksella 'note'
//     // -> eristetään se toisen NoteteraaNoten avulla
//     const { note } = props
//     return (
//         <li>
//             {note.content}
//         </li>
//     )
// }

//Ei ole LUOKKA -> this.props yms ei käytössä!
// const App = (props) => {
//     //Tiedetään, missä muodossa props tulee, otetaan App notes = {notes} sellaisenaan parametriksi tänne
//     //Voidaan Notesätä jälkeenpäin hakasulkeiden parametrejä sisälle erottamalla pilkulla
//     const { notes } = props

//     //map, yms loopfunktioihin tarvitsee Notesätä 'key' jotta react tietää järjestyksen
//     //järjestyksen katoaminen samantyyNotenen kuin quicksortissa
//     // const rivit = () => notes.map(note => <Note key={note.id} note={note} />) //HUOM note sellaisenaan !!!
//     //kutsu literaalille muodossa {rivit()}

//     //Palauttaa funktiotekstiä...
//     // console.log(rivit)
//     //Palauttaa varsinaisen tiedon
//     // console.log(rivit())

//     return (
//         <div>
//             <h1>Muistiinpanot</h1>
//             <ul>
//                 {notes.map(note => <Note key={note.id} note={note} />)}
//             </ul>
//         </div>
//     )
// }

ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
)