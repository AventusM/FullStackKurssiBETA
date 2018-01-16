import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { Togglable } from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Navbar, NavItem, Nav, Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      blogs: [],
      username: '',
      pw: '',
      error: null,
      user: null,
      msg: null,

      title: '',
      author: '',
      url: '',

      comment: ''
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs => {
      const byId = (blog1, blog2) => blog1.likes < blog2.likes
      this.setState({ blogs: blogs.sort(byId) })
    })
    userService.getAll().then(users => {
      window.localStorage.setItem('allUsers', JSON.stringify(users))
      this.setState({ users })
    })
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    const allUsers = window.localStorage.getItem('allUsers')
    console.log(allUsers)
    if (loggedInUserJSON) {
      const acceptedUser = JSON.parse(loggedInUserJSON)
      this.setState({
        user: acceptedUser,
        users: JSON.parse(allUsers)
      })
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
      //Ehkä poistettava myös usertaulukko tms.
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
          // console.log(blog)
        })

    } catch (exception) {
      console.log(exception)
    }
  }

  removeBlog = (id) => async (event) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      // console.log('blog id --->' + id)
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

  addCommentTo = (id) => async (event) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      const foundBlog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = { ...foundBlog, comments: foundBlog.comments.concat(this.state.comment) }

      const serveredBlog = await blogService.updateBlogComments(id, updatedBlog)
      const parsedBlog = JSON.parse(serveredBlog.data)
      // console.log(this.state.blogs.filter(blog => blog.id !== id))

      const remainingBlogs = this.state.blogs.filter(blog => blog.id !== id)
      const paramComment = this.state.comment

      this.setState({
        msg: `comment '${paramComment}' added to ${parsedBlog.title}`,
        blogs: remainingBlogs.concat(parsedBlog),
        comment: ''
      })
      setTimeout(() => {
        this.setState({
          msg: null,
        })
      }, 5000)

      console.log(this.state.blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const userById = (id) => this.state.users.find(user => user.id === id)
    const blogById = (id) => this.state.blogs.find(blog => blog.id === id)

    if (this.state.user === null) {
      return (
        <div>
          <Login username={this.state.username} password={this.state.password} handleChange={this.handleFieldChange} handleSubmit={this.login} errorMsg={this.state.error} successMsg={this.state.msg} />
        </div>
      )
    }

    const styles = {
      navbar: {
        backgroundColor: '#ba4b01',
        borderRadius: '0'
      },
      brand: {
        color: 'white'
      },
      link: {
        color: 'black'
      },
      navbarButtonPadding: {
        paddingLeft: '650px'
      },
      navbarButton: {
        backgroundColor: '#f4e9e1',
      }
    }

    return (
      <div className="container">
        <div>
          <BrowserRouter>
            <div>
              <Navbar style={styles.navbar}>
                <Navbar.Header>
                  <Navbar.Brand style={styles.brand}>
                    blog app
                </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem href="#">
                    <NavLink style={styles.link} exact to="/">blogs</NavLink>
                  </NavItem>
                  <NavItem href="#">
                    <NavLink style={styles.link} exact to="/users">users</NavLink>
                  </NavItem>
                  <Navbar.Text>
                    <i style={styles.brand}>{this.state.user.name} logged in</i>
                  </Navbar.Text>
                  <NavItem style={styles.navbarButtonPadding}>
                    <Button active bsSize="xsmall" style={styles.navbarButton} onClick={this.logout}>logout</Button>
                  </NavItem>
                </Nav>
              </Navbar>
              <Notification error={this.state.error} msg={this.state.msg} />
              <Togglable buttonLabel="create new blog" ref={component => this.blogForm = component}>
                <BlogForm
                  titleFieldValue={this.state.title}
                  authorFieldValue={this.state.author}
                  urlFieldValue={this.state.url}
                  blogFormChangeFunction={this.handleFieldChange}
                  blogFormSubmitFunction={this.addBlog}
                />
              </Togglable>
              <Route exact path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
              <Route exact path="/users" render={() => <Users users={this.state.users} />} />
              {/* Blogin poistoon liittyvä bugi korjattu -> redirect jos sitä ei ole enää olemassa */}
              <Route exact path="/blogs/:id" render={({ match }) =>
                blogById(match.params.id)
                  ? <Blog blog={blogById(match.params.id)} likeFunction={this.addLike} removeFunction={this.removeBlog} commentFieldValue={this.state.comment} commentFormChangeFunction={this.handleFieldChange} commentSubmitFunction={this.addCommentTo} />
                  : <Redirect to="/" />} />
              <Route exact path="/" render={() => <Blogs blogs={this.state.blogs} />} />
            </div>
          </BrowserRouter>
        </div >
      </div >
    )
  }
}

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <ListGroup>
        {blogs.map(blog =>
          <ListGroupItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  )
}


const User = ({ user }) => {
  console.log(user)
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      {user.blogs.length === 0
        ? <p>none</p>
        : <ListGroup>
          {user.blogs.map(blog =>
            <ListGroupItem key={blog.id}>{blog.title} by {blog.author}</ListGroupItem>
          )}
        </ListGroup>}
    </div>
  )
}

const Users = ({ users }) => {
  console.log('Usersin sisällä', users)
  return (
    <div>
      <h2>users</h2>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const Login = ({ username, password, handleChange, handleSubmit, errorMsg, successMsg }) => {
  return (
    <div className="container">
      <Notification error={errorMsg} msg={successMsg} />
      <LoginForm
        username={username}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default App;
