import React from 'react'
import { inputFilterChange } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.inputFilterChange(event.target.value)
    // this.props.store.dispatch(inputFilterChange(event.target.value))
    // input-kentän arvo muuttujassa event.target.value
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  inputFilterChange
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
// export default Filter