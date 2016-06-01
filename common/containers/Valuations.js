import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ValuationsHeader from '../components/ValuationsHeader'

import { editInfo, fetchValuation } from '../actions/valuations'
import { INPUT_NAMES } from '../constants/InputNames'

class Valuations extends Component {

  componentDidMount() {

  }

	render() {
    const {
      push,
      children
    } = this.props

    return (
      <div className='vMain'>
        <ValuationsHeader push={push} />
        {children}
      </div>
    )
  }
}

Valuations.propTypes = {
  
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Valuations)