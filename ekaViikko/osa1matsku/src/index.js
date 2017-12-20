import React from 'react'
import ReactDOM, { render } from 'react-dom'

// const Hello = (props) => {
//     return (
//         <div>
//             <p>Your name is {props.name}, {props.age} years of age</p>
//         </div>
//     )
// }

// const Footer = () => {
//     return (
//         <div>
//             greeting app created by <a href="https://github.com/AventusM">Anton Moroz</a>
//         </div>
//     )
// }

// const App = () => {
//     const nimi = 'Geir'
//     const ika = 23
//     return (
//         <div>
//             <Hello name="Anton" age={24} />
//             <Hello name={nimi} age={ika} />
//             <Footer />
//         </div>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'))

// Hellon funktionaalinen komponentti
// const Hello = (props) => {
//     return (
//       <div>
//         <p>Hello {props.name}, you are {props.age} years old</p>
//       </div>
//     )
//   }

// class Hello extends React.Component {
//     //Propsit 'sisältyy' luokan mallissa muotoon this.props
//     //Kamat renderin sisällä -> this.yyyy scope limits
//     render() {
//         // const name = this.props.name
//         // const age = this.props.age
//         //Destrukturointi seuraavasti:
//         const { name, age } = this.props
//         const syntymaVuosi = () => {
//             const yrNow = 1900 + new Date().getYear()
//             return yrNow - this.props.age
//         }
//         return (
//             <div>
//                 <p>Hello {this.props.name}, you are {this.props.age} years old</p>
//                 <p>This means your you were born in {syntymaVuosi()}</p>
//             </div>
//         )
//     }
// }

// const App = () => {
//     return (
//         <div>
//             <Hello name='Anton Moroz' age={24} />
//         </div>
//     )
// }

// const App = (props) => {
//     //Näyttää hassulta, sillä vain yksi parametri..
//     //.render - metodi props on counter jokatapauksessa
//     //Vastaavasti voidaan tehdä props.counter.value
//     const { counter } = props
//     return (
//         <div>{counter.value}</div>
//     )
// }

// const counter = {
//     value: 1
// }

// const renderoi = () => {
//     ReactDOM.render(<App counter={counter} />, document.getElementById('root'))
// }

// setInterval(() => {
//     renderoi()
//     counter.value += 1;
// }, 0)

// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         //Component state
//         //setState - metodi muokkaa näitä
//         //https://github.com/uberVU/react-guide/blob/master/props-vs-state.md
//         this.state = {
//             counter: 1
//         }
//         // this.kasvataYhdella = this.kasvataYhdella.bind(this)
//         // this.nollaa = this.nollaa.bind(this)
//     } // End constructor
//     //Muotoon metodinNimi = () => {...}
//     //niin ei tarvitse laittaa konstruktoriin
//     //this.metodinNimiInstanssi = this.metodinNimi.bind(this)
//     //Päivitetään 'plus' - painiketta edellisen tilan perusteella
//     //Vain testi, laskuharjoituksissa ei tule käyttää tätä
//     // kasvataYhdella = () => {
//     //     this.setState((prevState) => ({
//     //         counter: prevState.counter + 1
//     //     }))
//     // }

//     kasvataYhdella = () => {
//         this.setState({ counter: this.state.counter + 1 })
//     }
//     nollaa = () => {
//         this.setState({ counter: 0 })
//     }

//     //Yhdistetään kasvataYhdellä ja nollaa - metodit yhteen
//     //Ikuisen loopin estääksemme laitetaan jutut muotoon
//     // return () => { this.setState . . . }
//     asetaArvoon = (arvo) => {
//         return () => {
//             this.setState({ counter: arvo })
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <Display counter={this.state.counter} />
//                 <div>
//                     <Button
//                         handleClick={this.asetaArvoon(this.state.counter + 1)}
//                         text='lisää'
//                     />
//                     <Button
//                         handleClick={this.asetaArvoon(this.state.counter - 1)}
//                         text='vähennä'
//                     />
//                     <Button
//                         handleClick={this.asetaArvoon(0)}
//                         text='nollaa'
//                     />
//                 </div>

//             </div >
//         )
//     }
// }

//ei-Destrukturoitu versio
//helpommin ymmärrettävissä toistaiseksi...
// const Display = (props) => {
//     return (
//         <div>
//             {props.counter}
//         </div>)
// }
//Uusi tapa ilman returnia...?
// const Display = (props) => <div>{props.counter}</div>
// const Display = ({ counter }) => <div>{counter}</div>
// const Button = (props) => (
//     <button onClick={props.handleClick}>
//         {props.text}
//     </button>
// )

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vasen: 0,
            oikea: 0,
            kaikki: []
        }
    }

    klikVasen = () => {
        this.setState({
            vasen: this.state.vasen + 1,
            //concat -> ei push, concat luo uuden taulukon
            //push päivittää olemassaolevaa eikä me haluta
            //muuttaa state - kenttää
            kaikki: this.state.kaikki.concat('v')
        })
    }

    klikOikea = () => {
        this.setState({
            oikea: this.state.oikea + 1,
            kaikki: this.state.kaikki.concat('o')
        })
    }

    render() {
        //Uusi tapa ilman returnia...?
        const historia = () => {
            if (this.state.kaikki.length === 0) {
                return (
                    <div>
                        <em>paina jotakin nappia aloittaaksesi</em>
                    </div>
                )
            }
            return (
                <div>
                    näppäilyhistoria: {this.state.kaikki.join(' ')}
                </div>
            )
        }
        return (
            <div>
                <div>
                    {this.state.vasen}
                    <button onClick={this.klikVasen}>vasen</button>
                    <button onClick={this.klikOikea}>oikea</button>
                    {this.state.oikea}
                    {/* Metodin sisällä -> this.kaikki() ei kutsuta */}
                    <div>{historia()}</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)