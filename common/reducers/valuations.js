import { EDIT_INFO } from '../constants/ValuationActions'
import { VALUATION_REQUEST, VALUATION_SUCCESS, VALUATION_FAILURE } from '../actions/valuations'
import { assign } from 'lodash'

const initialState = {
	balance: [
		{
		  value: 0,
		  name: 'Cash',
		  section: 'current-assets'
		},
		{
			value: 0,
			name: 'A/R',
		  section: 'current-assets'
		},
		{
			value: 0,
			name: 'Inventory',
		  section: 'current-assets'
		},
		{
			value: 0,
			name: 'A/P',
		  section: 'current-liablities'
		},
		{
			value: 0,
			name: 'Accrued Expenses',
		  section: 'current-liablities'
		},
		{
			value: 0,
			name: 'Portion of Liabilities',
		  section: 'current-liablities'
		},
		{
			value: 0,
			name: 'LT Securities',
			section: 'positive-assets'
		},
		{
			value: 0,
			name: 'PPE',
			section: 'positive-assets'
		},
		{
			value: 0,
			name: 'Goodwill',
			section: 'positive-assets'
		},
		{
			value: 0, 
			name: 'Intangible Assets',
			section: 'positive-assets'
		},
		{
			value: 0,
			name: 'Deferred Revenue',
			section: 'negative-assets'
		},
		{
			value: 0,
			name: 'Long Term Debt',
			section: 'negative-assets'
		}
	]
}

export default function valuations(state = initialState, action) {
	switch(action.type) {
		case EDIT_INFO:
			const balance = state.balance.map(item => {
        return item.name === action.name ?
          assign({}, item, { value: action.value, name: action.name, section: action.section }) :
          item
        }
      )
			return assign({}, state, { balance })
    default:
    	return state
  }
}

