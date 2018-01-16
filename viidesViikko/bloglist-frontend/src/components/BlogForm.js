import React from 'react'
import PropTypes from 'prop-types'
import { Button, ControlLabel, FormControl, FormGroup, Row, Col } from 'react-bootstrap'

const BlogForm = (props) => {
  const { titleFieldValue, authorFieldValue, urlFieldValue, blogFormSubmitFunction, blogFormChangeFunction } = props
  const styles = {
    buttonMargin: {
      marginBottom: '10px'
    }
  }
  return (
    <form onSubmit={blogFormSubmitFunction} className="blogForm">
      <FormGroup>
        <Row>
          <Col lg={4}>
            <ControlLabel>title</ControlLabel>
            <FormControl type="text" name="title" value={titleFieldValue} onChange={blogFormChangeFunction} />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <ControlLabel>author</ControlLabel>
            <FormControl type="text" name="author" value={authorFieldValue} onChange={blogFormChangeFunction} />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <ControlLabel>author</ControlLabel>
            <FormControl type="text" name="url" value={urlFieldValue} onChange={blogFormChangeFunction} />
          </Col>
        </Row>
      </FormGroup>
      <Button style={styles.buttonPadding} bsSize="small" bsStyle="success" type="submit">create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  titleFieldValue: PropTypes.string.isRequired,
  authorFieldValue: PropTypes.string.isRequired,
  urlFieldValue: PropTypes.string.isRequired,
  blogFormSubmitFunction: PropTypes.func.isRequired,
  blogFormChangeFunction: PropTypes.func.isRequired
}

export default BlogForm