import React from 'react'
import { Button, ControlLabel, FormControl, FormGroup, Row, Col } from 'react-bootstrap'

const LoginForm = (props) => {
  const { handleSubmit, handleChange, username, password } = props
  const styles = {
    border: {
      border: '2px solid #ba4b01',
      borderRadius: '10px',
      padding: '10px'
    }
  }
  return (
    <div style={styles.border} className="container">
      <h2>Log into application</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <FormGroup>
          <Row>
            <Col lg={3}>
              <ControlLabel>username</ControlLabel>
              <FormControl type="text" name="username" value={username} onChange={handleChange} />
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <ControlLabel>password</ControlLabel>
              <FormControl type="password" name="pw" value={password} onChange={handleChange} />
            </Col>
          </Row>
        </FormGroup>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm