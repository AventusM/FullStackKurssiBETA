import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      new_note: '',
      showAll: true
    }
    console.log('constructor')
  }


  //Renderin ohella erityinen metodi
  //Kutsutaan konstruktorin jälkeen( 1. kerralla ) , mutta ennen renderiä ( aina )
  componentWillMount() {
    console.log('will mount')
    axios.get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })
  }

  render() {
    console.log('render')
    return (<div>
    </div>)
  }
}

export default App