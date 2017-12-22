import React from 'react';
import Note from './components/Note'

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

//Halutaan muokata olemassaolevia lomakkeita käyttäjän syötteiden avulla
//Funktiossa ei tiloja -> takaisin luokkamuotoon
//tilanne säilyy ennallaan, mutta muistiinpanoilla on nyt tila

//muistiinpanojen sisältö löytyy tiedostosta index.js (const notes ...)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Olemassaolevat muistiinpanot
            //const{notes} = props -----> stateen ja notes: props.notes
            //muistiinpanoille onnistuu nyt alkioiden katenaatio
            // THIS puuttuu...?
            notes: props.notes,
            //Placeholder-value jota päivitetään kentän muutosten yhteydessä
            new_note: '',
            //Käytetään tätä propertyä togglepainiken kanssa näyttämään
            //Tärkeät / Ei-Tärkeät muistiinpanot
            showAll: true
        }
    }

    //Inputkentän tapahtumankäsittelijä
    //Synkronoi new_note:n syötekenttiin tehtyihin muutoksiin
    //Käytännössä KeyListener tms.
    handleNoteChange = (event) => {
        //Konsolissa jokaisen painalluksen jälkeen tieto lisäämättä olleesta muistiinpanon arvosta
        console.log(event.target.value)
        this.setState({ new_note: event.target.value })
    }

    //Napinpainalluksen tapahtumankäsittelijä
    //Lukuja ei muutella parametrein.. return ei tarpeellinen ehkä?
    addNote = (event) => {
        event.preventDefault()
        const newNoteObject = {
            content: this.state.new_note,
            //Tapa saada päiväys
            date: new Date().new,
            //Koodissa typo tässä kohtaa...
            important: Math.random() > 0.5,
            //Jokaiselle objektille vaaditaan id iteroivien funktioiden käyttöön
            id: this.state.notes.length + 1
        }

        const allNotes = this.state.notes.concat(newNoteObject)

        //Päivitetään olemassaolevia luokan kenttiä lopuksi painalluksen jälkeen
        //Lyhennetty päivitystapa pakottaa literaalien nimien olevan 
        //sama kuin olioliteraalien.. en tykkää :D
        this.setState({
            notes: allNotes,
            new_note: ''
        })
    }

    //Napin painallus muuttaa siis showAll-propertyn falsesta trueksi ja päinvastoin
    toggleNoteVisibility = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    render() {
        //Togglepainiken valinta
        const filteredNotes =
            //Täysin sama toteutus kuin clojuren if:ssä
            this.state.showAll ?
                this.state.notes : // showAll -> true --> filteredNotes = this.state.notes
                this.state.notes.filter(note => note.important === true) // showAll -> false
        //koska property important toimii boolean periaatteella (VERTAILU, ei siis nähdä suoraan)
        //niin riittää myös (note => note.important) (eli onko sille annettu rand yli 0.5)
        //Hyödynnetään showAll:n tulosta ja vaihdetaan myös sen viereistä tekstikenttää dynaamisesti
        //Tilanne kuitenkin käänteinen verrattuna filteredNotesiin
        //esim. showAll true -> kaikki näytetään
        // painetaan sitä -> 
        const filterLabel = this.state.showAll ?
            "näytä tärkeät" : // laitetaan showAll falseksi
            "näytä kaikki" // showAllista tulee true nappia painamalla

        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleNoteVisibility}>
                        {filterLabel}
                    </button>
                </div>
                <ul>
                    {filteredNotes.map(note => <Note key={note.id} note={note} />)}
                    {/* MUOKKAUS */}
                    {/* {this.state.notes.map(note => <Note key={note.id} note={note} />)} */}
                </ul>

                <form onSubmit={this.addNote}>
                    <input
                        value={this.state.new_note}
                        onChange={this.handleNoteChange} />
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default App