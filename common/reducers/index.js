import { combineReducers } from 'redux'
import todos from './todos'
import valuations from './valuations'
import company from './company'
import { routerReducer } from 'react-router-redux'
import { assign } from 'lodash'

const valuationsReducer = combineReducers(assign({}, {
	company,
  valuations
},
{
	routing: routerReducer
}))

export default valuationsReducer
