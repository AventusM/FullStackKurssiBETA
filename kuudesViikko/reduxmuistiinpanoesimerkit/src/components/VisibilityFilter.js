import React from 'react'
import PropTypes from 'prop-types'
import { filterChange } from '../reducers/filterReducer'

class VisibilityFilter extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  filterClicked = (value) => (e) => {
    this.context.store.dispatch(filterChange(value))
  }

  render() {
    return (
      <div>
        kaikki    <input type='radio' name='filter' onChange={this.filterClicked('ALL')} />
        tärkeät   <input type='radio' name='filter' onChange={this.filterClicked('IMPORTANT')} />
        eitärkeät <input type='radio' name='filter' onChange={this.filterClicked('NONIMPORTANT')} />
      </div>        
    )
  }
}

VisibilityFilter.contextTypes = {
  store: PropTypes.object
}

export default VisibilityFilter