import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    handleInputFieldChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    //Tapahtumakuuntelija nimenlisäysnapille (toistaiseksi)
    addNewEntry = (event) => {
        //Estetään sivun reload
        event.preventDefault()
        //lisätään uusi alkio joka lisätään persons - taulukkoon (uusi taulu)
        const newObject = {
            name: this.state.newName
        }
        //Katenoidaan uusi alkio taulukkoon ja päivitetään persons - taulukon state
        const allPersons = this.state.persons.concat(newObject)
        this.setState({
            persons: allPersons,
            //Tyhjennetään inputField lisäyksen jälkeen
            newName: ''
        })

        console.log(allPersons)

    }


    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addNewEntry}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleInputFieldChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Persons persons={this.state.persons} />
            </div>
        )
    }
}

const Persons = (props) => {
    const { persons } = props
    return (
        <div>
            <table>
                <tbody>
                    {persons.map(person =>
                        <tr key={person.name}>
                            <td>{person.name}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
