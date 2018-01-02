import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = (props) => {
  let shownMsg
  let shownStyle
  const { error, msg } = props
  if (error === null && msg === null) {
    return null
  } else if (error !== null && msg === null) {
    shownMsg = error
    shownStyle = 'error'
  } else {
    shownMsg = msg
    shownStyle = 'success'
  }

  return (
    <div className={shownStyle}>
      {shownMsg}
    </div>
  )
}

const BlogForm = (props) => {
  const { titleFieldValue, authorFieldValue, urlFieldValue, blogFormSubmitFunction, blogFormChangeFunction } = props
  return (
    <form onSubmit={blogFormSubmitFunction}>
      <div>
        title
              <input
          type="text"
          name="title"
          value={titleFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <div>
        author
              <input
          type="text"
          name="author"
          value={authorFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <div>
        url
              <input
          type="text"
          name="url"
          value={urlFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <button>create</button>
    </form>
  )
}

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
      user: null,
      msg: null,

      //Kuinka käyttäisin näitä propseja
      //Blog.js - tiedostosta?
      title: '',
      author: '',
      url: ''
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    //Tarkistetaan kirjautuneen käyttäjän tilanne. Muuten user saa arvokseen
    //aina null sivun uudelleenlatauksen yhteydessä
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      //Tehdään JSON - muotoisesta stringistä objekti
      const acceptedUser = JSON.parse(loggedInUserJSON)
      this.setState({ user: acceptedUser })
      blogService.setToken(acceptedUser.signedToken)
    }
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

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.signedToken) // Käyttäjä voi lisätä uusia blogeja tokenin avulla
      //Token alla
      // console.log(user.signedToken)
      this.setState({ username: '', pw: '', user })
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

  logout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInUser')
      this.setState({ user: null })
    } catch (exception) {
      console.log(exception)
    }
  }

  //Muutos -> ei iffejä, ei duplikaatteja
  // HUOM EI ASYNC
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  //Käytännössä täysin turha duplikaatti
  handleNewBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      //Jos aiheuttaa ongelmia niin required käyttöön vaan
      if (this.state.title === null || this.state.title.length === 0 || this.state.url === null || this.state.url.length === 0) {
        this.setState({
          error: 'blogista puuttuu otsikko ja/tai salasana'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
        return
      }

      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService.createBlog(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            title: '',
            author: '',
            url: ''
          })
        })

      this.setState({
        msg: `a new blog '${blogObject.title}' by ${blogObject.author} added`
      })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 5000)

    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification error={this.state.error} msg={this.state.msg} />

          <h2>Log in to application</h2>
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
                type="password"
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
        <Notification error={this.state.error} msg={this.state.msg} />
        <div>
          {this.state.user.name} logged in
          <button onClick={this.logout}>logout</button>
        </div>
        <div>
          <h2>create new</h2>
          <BlogForm
            titleFieldValue={this.state.title}
            authorFieldValue={this.state.author}
            urlFieldValue={this.state.url}
            blogFormChangeFunction={this.handleNewBlogChange}
            blogFormSubmitFunction={this.addBlog}
          />
        </div>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    );
  }
}

export default App;
