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
        const oneRemaining = filteredCountries.length === 1
        return (
            <div>
                find countries:
                <input
                    value={this.state.input_country}
                    onChange={this.handleCountryInputFieldChange} />
                {tooMany ? (<p><strong>ole hyvä ja täsmennä hakuasi</strong></p>) : (oneRemaining ? (<Country country={filteredCountries[0]} />) : (<Countries countries={filteredCountries} />))}
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
            <img src={country.flag} alt='' />
        </div >
    )
}

const Countries = (props) => {
    const { countries } = (props)
    return (
        <div>
            <table>
                <tbody>
                    {countries.map(country =>
                        <tr key={country.name}>
                            <td>{country.name}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));