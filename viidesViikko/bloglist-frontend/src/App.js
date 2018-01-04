import React from 'react'
// import Blog from './components/Blog' SIIRRETÄÄN TAKAISIN MYÖHEMMIN. NYT CONSTINA TÄÄLLÄ
import blogService from './services/blogs'
import loginService from './services/login'
import { Togglable, TogglableDiv } from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      pw: '',
      error: null,
      user: null,
      msg: null,

      title: '',
      author: '',
      url: ''
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs => {
      const byId = (blog1, blog2) => blog1.likes < blog2.likes
      this.setState({ blogs: blogs.sort(byId) })
    })
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const acceptedUser = JSON.parse(loggedInUserJSON)
      this.setState({ user: acceptedUser })
      blogService.setToken(acceptedUser.signedToken)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        pw: this.state.pw
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.signedToken) // Käyttäjä voi lisätä uusia blogeja tokenin avulla
      this.setState({ username: '', pw: '', user })
    } catch (exception) {
      this.setState({
        error: 'virheellinen käyttäjätunnus tai salasana'
      })
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

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()
    //Kun lisätään blogi, niin piilotetaan lisäyskenttä täällä
    //tähän tarkoitukseen vaaditaan ref
    this.blogForm.toggleVisibility()
    try {
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
        url: this.state.url,
      }

      await blogService.createBlog(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            title: '',
            author: '',
            url: ''
          })
        })

      //WORKAROUND - JOSTAIN SYYSTÄ LISÄÄJÄN NIMI EI LATAUDU UUTTA BLOGIA LISÄTESSÄ
      // ===> delete - nappi ei myöskään mahdollista renderöidä 
      blogService.getAll().then(blogs => {
        const byId = (blog1, blog2) => blog1.likes < blog2.likes
        this.setState({ blogs: blogs.sort(byId) })
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

  addLike = (id) => (event) => {
    event.preventDefault()
    event.stopPropagation() // Estetään parentin toiminto (toggle)
    try {

      const foundBlog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }

      // const result = 
      blogService.updateBlog(id, updatedBlog)
        .then(res => res.config)
        .then(config => {
          const byId = (blog1, blog2) => blog1.likes < blog2.likes
          const blog = JSON.parse(config.data)
          const remainingBlogs = this.state.blogs.filter(blog => blog.id !== id)
          this.setState({
            blogs: remainingBlogs.concat(blog).sort(byId)
          })
          console.log(blog)
        })

    } catch (exception) {
      console.log(exception)
    }
  }


  //Blogitaulukon manipulointi tapahtuu
  //tässä komponentissa
  //oikea muoto removeBlog = (id) => async(?) (event) => {...}
  removeBlog = (id) => async (event) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      console.log('blog id --->' + id)
      const foundBlog = this.state.blogs.find(blog => blog.id === id)
      if (window.confirm(`delete '${foundBlog.title}' by '${foundBlog.author}' ?`)) {
        await blogService.deleteBlog(id) //result.data = "" --> ei then-ketjuja tms.
        const remainingBlogs = this.state.blogs.filter(blog => blog.id !== id)
        this.setState({
          blogs: remainingBlogs
        })
      }


    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    console.log(this.state.user)

    //Kokeillaan erotella täysin omana osanaan täällä
    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          titleFieldValue={this.state.title}
          authorFieldValue={this.state.author}
          urlFieldValue={this.state.url}
          blogFormChangeFunction={this.handleFieldChange}
          blogFormSubmitFunction={this.addBlog}
        />
      </Togglable>
    )

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
                onChange={this.handleFieldChange} />
            </div>
            <div>password
              <input
                type="password"
                name="pw" //TÄRKEÄ IFFIHÄSSÄKÄN POISTAMISEKSI
                value={this.state.pw}
                onChange={this.handleFieldChange} />
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
          {blogForm()}
        </div>
        {this.state.blogs.map(blog =>
          <TogglableDiv title={blog.title} author={blog.author}>
            <Blog key={blog._id} blog={blog} likeFunction={this.addLike} removeFunction={this.removeBlog} />
          </TogglableDiv>
        )}
      </div>
    );
  }
}

const Blog = (props) => {
  const { blog, likeFunction, removeFunction } = props
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const addedByAnon = !blog.user // Voi kattoa joku this.state.blogs.find(blog => blog.... === ...)
  const match = addedByAnon ?
    false : // Tarkastelua ei lähdetä suorittamaan (satavarma error)
    blog.user.username === loggedInUser.username // Normaali tarkastelu
  return (
    <div>
      {blog.title} {blog.author}
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<a href={blog.url}>{blog.url}</a></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;{blog.likes} likes <button onClick={likeFunction(blog.id)}>like</button></p>
      {addedByAnon ?
        <p>&nbsp;&nbsp;&nbsp;&nbsp;added by anon</p> :
        <p>&nbsp;&nbsp;&nbsp;&nbsp;added by {blog.user.name}</p>}
      {match || addedByAnon ?
        <button onClick={removeFunction(blog.id)}>delete</button> :
        <p></p>}
    </div>
  )
}

export default App;
