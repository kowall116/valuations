import { VALUATION_REQUEST, VALUATION_SUCCESS, VALUATION_FAILURE } from '../actions/valuations'
import { assign } from 'lodash'

const initialCompanyState = {
	forms: {}
}

export default function valuations(state = initialCompanyState, action) {
	switch(action.type) {
     case VALUATION_REQUEST:
	    console.log("VALUATION_REQUEST")
     	return state
   	case VALUATION_SUCCESS:
   		console.log(action)
   		return assign({}, state, { forms: action.payload })
    default:
    	return state
  }
}