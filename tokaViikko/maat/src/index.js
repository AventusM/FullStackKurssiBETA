import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            input_country: '',
        }
    }


    handleCountryInputFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ input_country: event.target.value })
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            // console.log(res.data)
            this.setState({ countries: res.data })
        })
    }

    render() {
        const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.input_country.toLowerCase()))
        const tooMany = filteredCountries.length > 10
        // console.log('näytettyjen maiden määrä ---> ' + countriesShown)
        // const showFilteredCountries = countriesShown > 10 ?
        //     "täsmennä hakuasi!" :
        //     filteredCountries
        // console.log(showFilteredCountries)
        return (
            <div>
                find countries:
                <input
                    value={this.state.input_country}
                    onChange={this.handleCountryInputFieldChange} />
                {tooMany ?
                    (<p><strong>ole hyvä ja täsmennä hakuasi</strong></p>) :
                    (<Countries countries={filteredCountries} />)}
            </div>
        )
    }
}

const Country = (props) => {
    const { country } = (props)
    return (
        <div>
            <h3>{country.name} {country.nativeName}</h3>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img src={country.flag} />
        </div >
    )
}

const Countries = (props) => {
    const { countries } = (props)
    const oneRemaining = countries.length === 1
    console.log(oneRemaining)
    return (
        <div>
            {oneRemaining ?
                //Yhden alkion taulukko.. näyttää hassulta, jäljellä ei tosin ole muita...
                //mutta ternaryoperaatioiden ketjutus ei onnistunut
                //App-komponentissa, joten siirretään se tänne...
                (<Country country={countries[0]} />) : // oneRemaining ---> true
                (<table>
                    <tbody>
                        {countries.map(country =>
                            <tr key={country.name}>
                                <td>{country.name}</td>
                            </tr>)}
                    </tbody>
                </table>)}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));