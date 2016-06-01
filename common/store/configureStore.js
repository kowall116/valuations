import { createStore, applyMiddleware, combineReducers } from 'redux'
import valuationsReducer from '../reducers'
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware'
import { syncHistoryWithStore } from 'react-router-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

const initialState = typeof window !== 'undefined' ? window.__initialState__: {}

export function configureValuationsStore(history, initialState) {

  const valuationsStore = createStore(
  	valuationsReducer,
  	initialState,
  	applyMiddleware(
  		thunk,
			apiMiddleware,
			routerMiddleware(history)
		)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return valuationsStore
}
