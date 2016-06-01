import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ValuationsInputList from '../components/ValuationsInputList'
import { editInfo, fetchValuation } from '../actions/valuations'
import { INPUT_NAMES } from '../constants/InputNames'

class ValuationsCompanyPage extends Component {
	render() {
    const { 
    	valuations,
    	company,
    	editInfo
    } = this.props

    return (
      <div>
        <ValuationsInputList 
        	inputs={INPUT_NAMES} 
        	valuations={this.props.valuations.balance} 
        	editInfo={editInfo} />
      </div>
    )
  }

  componentDidMount() {
    const { 
    	company,
    	fetchValuation
    } = this.props
    fetchValuation(company)
  }
}

ValuationsCompanyPage.propTypes = {
  company: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    valuations: state.valuations,
    company: ownProps.params.company
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { editInfo, fetchValuation }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValuationsCompanyPage)