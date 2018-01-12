import React from 'react'
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote, voteFunction }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes <Button bsStyle="success" bsSize="small" onClick={() => voteFunction(anecdote.id)}>vote</Button></p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <Grid>
    <Row>
      <Col lg={8}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col>
        <img src="images/linus.jpg" width={202} height={253} />
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      redirectToAnecdotes: false
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    })
    this.setState({ redirectToAnecdotes: true })
  }

  render() {
    if (this.state.redirectToAnecdotes) {
      return <Redirect to="/" /> //Redirect --> createn uudelleenhaku lähtee kokonaan uudelleen liikkeelle
    }
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Row>
              <Col lg={4}>
                <ControlLabel>content </ControlLabel>
                <FormControl name='content' value={this.state.content} onChange={this.handleChange} required />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <ControlLabel>author </ControlLabel>
                <FormControl name='author' value={this.state.author} onChange={this.handleChange} required />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <ControlLabel>url for more info</ControlLabel>
                <FormControl name='info' value={this.state.info} onChange={this.handleChange} required />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <br />
                <Button bsStyle="success" type="submit">create</Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: 1
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: 2
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0))
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} has been created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === Number(id))

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const styles = {
      notificationStyle: {
        color: 'black',
        backgroundColor: 'lightgrey',
        borderLeft: '5px solid',
        borderRadius: '4px',
        padding: '10px',
        width: '500px',
        margin: '10px'
      },
      navBarStyle: {
        color: 'black',
        backgroundColor: 'lightgrey',
        borderBottom: '2px solid',
        borderTop: '2px solid',
        borderRadius: '5px',
        padding: '10px',
        width: '205px',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      activeNavLinkStyle: {
        fontWeight: 'bold',
        color: 'white'
      }
    }


    console.log(this.state.anecdotes)
    const anecdoteById = (id) => {
      console.log(id)
      return this.state.anecdotes.find(anecdote => anecdote.id === Number(id))
    }
    return (
      <div className="container">
        <h1 className="text-center">Software anecdotes</h1>
        <Menu anecdotes={this.state.anecdotes} addNew={this.addNew} voteFunction={this.vote} matcher={anecdoteById} notification={this.state.notification} styles={styles} />
        <hr />
        <div className="text-center">
          <Footer />
        </div>
      </div>
    );
  }
}

const Menu = ({ anecdotes, addNew, voteFunction, matcher, notification, styles }) => (
  <div>
    <BrowserRouter>
      <div>
        <div style={styles.navBarStyle}>
          <NavLink activeStyle={styles.activeNavLinkStyle} exact to="/">anecdotes</NavLink>&nbsp;
        <NavLink activeStyle={styles.activeNavLinkStyle} exact to="/create">create new</NavLink>&nbsp;
        <NavLink activeStyle={styles.activeNavLinkStyle} exact to="/about">about</NavLink>
        </div>
        {notification
          ? <div style={styles.notificationStyle}>{notification}</div>
          : <p></p>}
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={matcher(match.params.id)} voteFunction={voteFunction} />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/create" render={() => <CreateNew addNew={addNew} />} />
      </div>
    </BrowserRouter>
  </div>
)

export default App;