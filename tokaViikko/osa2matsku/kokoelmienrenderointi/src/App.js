import React from 'react';
import Note from './components/Note'

const App = (props) => {
    //Tiedetään, missä muodossa props tulee, otetaan App notes = {notes} sellaisenaan parametriksi tänne
    //Voidaan Notesätä jälkeenpäin hakasulkeiden parametrejä sisälle erottamalla pilkulla
    const { notes } = props

    //map, yms loopfunktioihin tarvitsee Notesätä 'key' jotta react tietää järjestyksen
    //järjestyksen katoaminen samantyyNotenen kuin quicksortissa
    // const rivit = () => notes.map(note => <Note key={note.id} note={note} />) //HUOM note sellaisenaan !!!
    //kutsu literaalille muodossa {rivit()}

    //Palauttaa funktiotekstiä...
    // console.log(rivit)
    //Palauttaa varsinaisen tiedon
    // console.log(rivit())

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <ul>
                {notes.map(note => <Note key={note.id} note={note} />)}
            </ul>
        </div>
    )
}

export default App