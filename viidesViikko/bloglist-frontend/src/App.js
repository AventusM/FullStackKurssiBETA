import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    //Muista lisätä new_blog : '' myöhemmin
    // KENTTIEN NIMIEN OLTAVA SAMAT KUIN BACKENDISSÄ
    // password ---> pw OLI PAKKO TEHDÄ
    this.state = {
      blogs: [],
      username: '',
      pw: '',
      error: null,
      user: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  //Konsoliin tiedot kirjautumistilanteesta
  // HUOM ASYNC
  login = async (event) => {
    event.preventDefault()
    try {
      //Kirjaudutaan sisään annetuilla tunnuksilla, login - metodi ottaa vain 1 parametrin..?
      const user = await loginService.login({
        username: this.state.username,
        pw: this.state.pw
      })

      //Reset painalluksen jälkeen (user : user) ---> käytetään parempaa tapaa suoraan
      this.setState({ username: '', pw: '', user })
      console.log(this.state.user)
    } catch (exception) {
      this.setState({
        error: 'virheellinen käyttäjätunnus tai salasana'
      })
      //Ajastin sille, kuinka pitkään ylläolevaa erroria näytetään
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  //Muutos -> ei iffejä, ei duplikaatteja
  // HUOM EI ASYNC
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          {/* login - funktion arvo muuttuu napista */}
          <form onSubmit={this.login}>
            <div>username
            <input
                type="text"
                name="username" //TÄRKEÄ IFFIHÄSSÄKÄN POISTAMISEKSI
                value={this.state.username}
                onChange={this.handleLoginFieldChange} />
            </div>
            <div>password
              <input
                text="password"
                name="pw" //TÄRKEÄ IFFIHÄSSÄKÄN POISTAMISEKSI
                value={this.state.pw}
                onChange={this.handleLoginFieldChange} />
            </div>
            <button>login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    );
  }
}

export default App;
