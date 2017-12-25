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
                .catch(err => {
                    alert(`muistiinpano ' ${foundNote.content} ' on poistettu, mutta tilannetta ei vielä synkronoitu... korjataan tilanne!`)
                    this.setState({
                        notes: this.state.notes.filter(note => note.id !== id)
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

export default App