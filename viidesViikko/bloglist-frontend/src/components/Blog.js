import React from 'react'
import PropTypes from 'prop-types'
import { Button, Label, ControlLabel, FormControl, FormGroup, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

const Blog = (props) => {
  const { blog, likeFunction, removeFunction, commentSubmitFunction, commentFormChangeFunction, commentFieldValue } = props
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const addedByAnon = !blog.user // Voi kattoa joku this.state.blogs.find(blog => blog.... === ...)
  const match = addedByAnon ?
    false : // Tarkastelua ei lähdetä suorittamaan (satavarma error)
    blog.user.username === loggedInUser.username // Normaali tarkastelu
  const styles = {
    likeButtonMargin: {
      marginTop: '-58px',
      marginLeft: '70px'
    },
    addingUserMargin: {
      marginTop: '-20px'
    },
    deleteButtonMargin: {
      marginTop: '5px'
    }
  }
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div className="blogs">
        <div><a href={blog.url}>{blog.url}</a></div>

        <div>
          <h4><Label bsStyle="primary">{blog.likes} likes</Label></h4>
          <Button style={styles.likeButtonMargin} bsStyle="success" bsSize="xsmall" onClick={likeFunction(blog.id)}>like the blog!</Button>
        </div>

        {addedByAnon ?
          <div style={styles.addingUserMargin}>added by anon</div> :
          <div style={styles.addingUserMargin}>added by {blog.user.name}</div>}
        {match || addedByAnon
          ? <Button style={styles.deleteButtonMargin} bsStyle="danger" bsSize="xsmall" onClick={removeFunction(blog.id)}>delete</Button>
          : <div></div>}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={commentSubmitFunction(blog.id)}>
          <FormGroup>
            <Row>
              <Col lg={4}>
                <FormControl placeholder="kommentti . . ." type="text" name="comment" value={commentFieldValue} onChange={commentFormChangeFunction} />
              </Col>
              <Col lg={4}>
                <Button bsStyle="success" type="submit">add a comment</Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
      <div>
        {blog.comments.map(comment =>
          <li>{comment}</li>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeFunction: PropTypes.func.isRequired,
  removeFunction: PropTypes.func.isRequired,
  commentFieldValue: PropTypes.string.isRequired //Ei toimi? Väännetään näitä lopputehtävässä erikseen...
}

export default Blog