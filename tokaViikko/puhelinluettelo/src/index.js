import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Data haetaan nyt db.json - tiedostosta
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    handleNameInputFieldChange = (event) => {
        // console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNumberInputFieldChange = (event) => {
        // console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleFilterInputFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ filter: event.target.value })
    }

    //Tapahtumakuuntelija nimen- ja puhnronlisäysnapille

    //axios.post()
    addNewEntry = (event) => {
        //Estetään sivun reload
        event.preventDefault()

        //lisätään uusi alkio joka lisätään persons - taulukkoon (uusi taulu)
        const newObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        personService.create(newObject)
            .then(res => {
                this.setState({
                    persons: this.state.persons.concat(res.data),
                    newName: '',
                    newNumber: '',
                    filter: ''
                })
            })

    }

    //window.alert päivittää sivua jos nappia ei paina heti (ajankäyttöilmoitus ??)
    noAction = (event) => {
        event.preventDefault()
        console.log("Duplikaatti huomattu")
    }

    //lifeCycle - metodit tänne renderimetodin lähelle. Erityismetodit
    //get / post vähän niinkuin sparkin vastaavat.
    //.then on fulfilled promisen tapahtumankuuntelija
    //then saa vastauksena olion result missä on headerit, data yms.
    componentWillMount() {
        personService
            .getAll()
            .then(res => {
                this.setState({ persons: res.data })
            })
    }

    deletePerson = (id) => (e) => {
        e.preventDefault
        // Ternary ei halua käydä tähän tarkoitukseen
        const poistettavaHenkilo = this.state.persons.find(person => person.id === id)
        if (window.confirm('Poistetaanko ' + poistettavaHenkilo.name + '?')) {
            this.setState({
                persons: this.state.persons.filter(person => person.id !== id)
            })
            personService
                .remove(id)
        }
    }

    render() {
        const hasDuplicate = this.state.persons.some(person => person.name === this.state.newName)
        console.log(hasDuplicate)
        const addOrNotify = hasDuplicate ?
            this.noAction :
            this.addNewEntry
        //Case - insensitivity ---> tehdään vertailu pienillä kirjaimilla
        const showFilteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <InputField prefix="rajaa näytettäviä" value={this.state.filter} onChangeFunction={this.handleFilterInputFieldChange} />
                <h3>Lisää uusi / muuta olemassaolevan numeroa</h3>
                <form onSubmit={addOrNotify}>
                    <InputField prefix="nimi" value={this.state.newName} onChangeFunction={this.handleNameInputFieldChange} />
                    <InputField prefix="numero" value={this.state.newNumber} onChangeFunction={this.handleNumberInputFieldChange} />
                    <SubmitButton type="submit" sisalto="lisaa" />
                </form>
                <h2>Numerot</h2>
                {/* bind this removeFunctioniin jos valittaa undefinedista
                viite menee toiseen literaaliin -> saadaan tällä tavalla ongelma 'ratkaistua' */}
                {/* <Persons persons={showFilteredPersons} removeFunction={this.deletePerson.bind(this)} /> */}
                <Persons persons={showFilteredPersons} deletePerson={this.deletePerson.bind(this)} />
            </div >
        )
    }
}

const SubmitButton = (props) => {
    const { type, sisalto } = props
    return (
        <div>
            <button type={type}>{sisalto}</button>
        </div>
    )
}

const InputField = (props) => {
    const { prefix, value, onChangeFunction } = props
    return (
        <div>
            {prefix}:
            <input value={value} onChange={onChangeFunction} />
        </div>
    )
}

const Persons = (props) => {
    const { persons, deletePerson } = props
    return (
        <div>
            <table>
                <tbody>
                    {persons.map(person =>
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={deletePerson(person.id)}>poista</button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
