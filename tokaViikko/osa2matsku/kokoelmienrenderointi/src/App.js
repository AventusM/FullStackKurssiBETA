import React from 'react';
import Note from './components/Note'
import noteService from './services/notes'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            date: '',
            new_note: '',
            showAll: true
        }
    }

    componentWillMount() {
        noteService
            .getAll() //axios.get()
            .then(response => {
                this.setState({ notes: response.data })
            })
    }

    addNote = (event) => {
        event.preventDefault()
        const newNoteObject = {
            content: this.state.new_note,
            date: new Date().new,
            important: Math.random() > 0.5
            //ID:n lisäys ei tarpeellinen, 'palvelinpuoli' hoitaa
        }

        noteService
            .create(newNoteObject) // axios.post()
            .then(res => {
                this.setState({
                    notes: this.state.notes.concat(res.data),
                    new_note: ''
                })
            })
    }

    toggleImportanceOfNote = (id) => {
        return () => {
            const foundNote = this.state.notes.find(note => note.id === id)
            const changedNote = { ...foundNote, important: !foundNote.important }
            noteService
                .update(id, changedNote) //axios.put (ei patch)
                .then(res => {
                    const restNotes = this.state.notes.filter(note => note.id !== id)
                    this.setState({
                        notes: restNotes.concat(res.data)
                    })
                })
        }
    }

    toggleNoteVisibility = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ new_note: event.target.value })
    }

    render() {
        const filteredNotes =
            this.state.showAll ?
                this.state.notes : // showAll -> true --> filteredNotes = this.state.notes
                this.state.notes.filter(note => note.important === true); // showAll -> false
        const filterLabel = this.state.showAll ?
            "näytä tärkeät" : // laitetaan showAll falseksi
            "näytä kaikki" // showAllista tulee true nappia painamalla

        const byId = (note1, note2) => note1.id - note2.id
        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleNoteVisibility}>
                        {filterLabel}
                    </button>
                </div>
                <ul>
                    {filteredNotes.sort(byId).map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOfNote(note.id)} />)}
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

// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             //Olemassaolevat muistiinpanot
//             //const{notes} = props -----> stateen ja notes: props.notes
//             //muistiinpanoille onnistuu nyt alkioiden katenaatio
//             // THIS puuttuu...?
//             //axios mukana -> props.notes on turha
//             notes: [],
//             //Placeholder-value jota päivitetään kentän muutosten yhteydessä
//             new_note: '',
//             //Käytetään tätä propertyä togglepainiken kanssa näyttämään
//             //Tärkeät / Ei-Tärkeät muistiinpanot
//             showAll: true
//         }
//     }

//     //Haetaan db.json - tiedostossa olevat tiedot oletusarvoisesti näkyville
//     // seuraus ---> komponentille App ei ole enää tarvetta välittää
//     //dataa propseina
//     componentWillMount() {
//         console.log('will mount')
//         axios.get('http://localhost:3001/notes')
//             .then(response => {
//                 console.log('promise fulfilled')
//                 this.setState({ notes: response.data })
//             })
//     }

//     //Note-komponentin tekstinmuuttaja
//     toggleImportanceOfNote = (id) => {
//         return () => {
//             //Koodissa virhe tässä... ${id} ei näemmä toimi?
//             //WTF IS THAT??? shift + ´ = ` jota hyödynnetään näissä ??????
//             //WTF IS THAT??? shift + ´ = ` jota hyödynnetään näissä ??????
//             const noteUrl = `http://localhost:3001/notes/${id}`
//             //Uusi metodi TM20 tms found..
//             const foundNote = this.state.notes.find(note => note.id === id)
//             //näppärä keino muokata pelkästään important - property
//             //Luodaan kopio olemassaolevasta oliosta, EI muuteta
//             //olion tilaa suoraan
//             const changedNote = { ...foundNote, important: !foundNote.important }


//             axios.put(noteUrl, changedNote)
//                 .then(res => {
//                     //Jatketaan edellisestä ja otetaan ylös olemassaolevat MUUT muistiinpanot
//                     const preExistingUnChangedNotes = this.state.notes.filter(note => note.id !== id)
//                     this.setState({
//                         notes: preExistingUnChangedNotes.concat(res.data)
//                     })
//                 })
//             console.log(`importance of ${id} is toggleable`)
//         }
//     }

//     //Inputkentän tapahtumankäsittelijä
//     //Synkronoi new_note:n syötekenttiin tehtyihin muutoksiin
//     //Käytännössä KeyListener tms.
//     handleNoteChange = (event) => {
//         //Konsolissa jokaisen painalluksen jälkeen tieto lisäämättä olleesta muistiinpanon arvosta
//         console.log(event.target.value)
//         this.setState({ new_note: event.target.value })
//     }

//     //Napinpainalluksen tapahtumankäsittelijä
//     //Lukuja ei muutella parametrein.. return ei tarpeellinen ehkä?
//     addNote = (event) => {
//         event.preventDefault()
//         const newNoteObject = {
//             content: this.state.new_note,
//             //Tapa saada päiväys
//             date: new Date().new,
//             //Koodissa typo tässä kohtaa...
//             important: Math.random() > 0.5,
//             //Jokaiselle objektille vaaditaan id iteroivien funktioiden käyttöön
//             //MUUTOS -> palvelin luo id:n automaattisesti !!!
//             //kun käytetään axios.postia <<<<<---- SLURP *CLICK* NICE
//             // id: this.state.notes.length + 1
//         }
//         //Löydetty paikka missä tämä koodinpätkä sijaitsee
//         //materiaalista :D

//         //Muistiinpano on response-olion data fieldin arvona
//         axios.post('http://localhost:3001/notes', newNoteObject)
//             .then(res => {
//                 this.setState({
//                     //Päivitetään näytettävä field, joka näyttää nyt myös
//                     //palvelimen palauttaman uuden muistiinpanon
//                     //Uusi muoto siirtää nämä kaksi nyt funktion sisälle
//                     notes: this.state.notes.concat(res.data),
//                     new_note: ''
//                 })
//             })
//     }

//     //Napin painallus muuttaa siis showAll-propertyn falsesta trueksi ja päinvastoin
//     toggleNoteVisibility = () => {
//         this.setState({ showAll: !this.state.showAll })
//     }

//     render() {
//         //Togglepainiken valinta
//         const filteredNotes =
//             //Täysin sama toteutus kuin clojuren if:ssä
//             this.state.showAll ?
//                 this.state.notes : // showAll -> true --> filteredNotes = this.state.notes
//                 this.state.notes.filter(note => note.important === true) // showAll -> false
//         //koska property important toimii boolean periaatteella (VERTAILU, ei siis nähdä suoraan)
//         //niin riittää myös (note => note.important) (eli onko sille annettu rand yli 0.5)
//         //Hyödynnetään showAll:n tulosta ja vaihdetaan myös sen viereistä tekstikenttää dynaamisesti
//         //Tilanne kuitenkin käänteinen verrattuna filteredNotesiin
//         //esim. showAll true -> kaikki näytetään
//         // painetaan sitä -> 
//         const filterLabel = this.state.showAll ?
//             "näytä tärkeät" : // laitetaan showAll falseksi
//             "näytä kaikki" // showAllista tulee true nappia painamalla

//         //Muistiinpanojen järjestämistä id:n avulla
//         const byId = (note1, note2) => note1.id - note2.id
//         return (
//             <div>
//                 <h1>Muistiinpanot</h1>
//                 <div>
//                     <button onClick={this.toggleNoteVisibility}>
//                         {filterLabel}
//                     </button>
//                 </div>
//                 <ul>
//                     {filteredNotes.sort(byId).map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOfNote(note.id)} />)}
//                     {/* MUOKKAUS */}
//                     {/* {this.state.notes.map(note => <Note key={note.id} note={note} />)} */}
//                 </ul>

//                 <form onSubmit={this.addNote}>
//                     <input
//                         value={this.state.new_note}
//                         onChange={this.handleNoteChange} />
//                     <button type="submit">tallenna</button>
//                 </form>
//             </div>
//         )
//     }
// }

export default App